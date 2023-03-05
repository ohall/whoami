const express = require('express');
const bodyParser = require('body-parser');
const fullPrompt = require('./lib/prompt');
const app = express();
const apiKey = process.env.OPENAI_API_KEY;
const whoamiPrompt = process.env.WHOAMI_PROMPT;
const errMsg = 'Sorry AI backend is not responding, please try again later.'

// used for parsing input from html
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // set the view engine to use EJS templating

let appState = {
  page: 'home',
  chatGPTResponse: '',
  awaiting: false,
  prompt: ''
}

app.get('/health', async (req, res) => {
  res.send('OK');
});

app.get('/', async (req, res) => {
  appState.page = 'home';
  log({type:'state', content:appState});
  res.render('index', appState);
  appState.chatGPTResponse = '';
});

app.post('/prompt', async (req, res) => {
  appState.page = 'prompt';
  log({type:'state', content:appState});
  appState.prompt = req?.body?.prompt || '';
  if (!appState.awaiting && appState.chatGPTResponse.length === 0) {
    res.render('index', appState);
    appState.awaiting = true;
    appState.chatGPTResponse = await getChatGPTResponse(fullPrompt(appState.prompt, whoamiPrompt));
    appState.awaiting = false;
  } else if (appState.chatGPTResponse.length > 0) {
    res.redirect('/')
  }
});

app.listen(3000, () => {
  log({type:'startup', content: {
    port:'3000',
    prompt: whoamiPrompt,
    nodeVersion: process.version
  }});
});

const log = ({type, content}) => console.log(JSON.stringify({type, content}));

const getChatGPTResponse = async(prompt) => {
  if (!apiKey) return errMsg

  const config = {
      url: "https://api.openai.com/v1/completions",
      prompt,
      model: "text-davinci-003",
      max_tokens: 2048,
      temperature: 0  
  };

  const { url, ...remainingConfigs } = config;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const body = JSON.stringify({ ...remainingConfigs, prompt });
  const request = await fetch(url, { headers, method:'POST', body });
  const response = await request.json();

  if (response?.choices[0]?.text) {
    return response?.choices[0]?.text?.trim();
  }

  log({type: 'error', content: response});
  return errMsg
}
