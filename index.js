const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// used for parsing input from html
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set the view engine to use EJS templating

let appState = {
  page: 'home',
  chatGPTResponse: '',
  awaiting: false,
  prompt: ''
}

app.get('/', async (req, res) => {
  appState.page = 'home';
  console.log( 'home' );
  console.log( appState );
  res.render('index', appState);
  appState.chatGPTResponse = '';
});

app.post('/prompt', async (req, res) => {
  appState.page = 'prompt';
  console.log( 'prompt' );
  console.log( appState );
  appState.prompt = req?.body?.prompt || '';
  if (!appState.awaiting && appState.chatGPTResponse.length === 0) {
    res.render('index', appState);
    appState.awaiting = true;
    appState.chatGPTResponse = await getChatGPTResponse(appState.prompt)
    appState.awaiting = false;
  } else if (appState.chatGPTResponse.length > 0) {
    console.log( 'redirect' );
    res.redirect('/')
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const getChatGPTResponse = async(prompt) => {
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
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  };
  
  const method = 'POST';
  const body = JSON.stringify({ ...remainingConfigs, prompt });
  const request = await fetch(url, { headers, method, body });
  const response = await request.json();
  return response?.choices[0]?.text?.trim();
}
