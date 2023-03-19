module.exports = {
  getOpenAIOpts: (prompt) => ({
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: 'POST',
    url: 'https://api.openai.com/v1/completions',
    body: JSON.stringify({
      model: 'text-davinci-003',
      max_tokens: 2048,
      temperature: 0,
      prompt
    }),
    signal: AbortSignal.timeout(8000)//openai request timeout
  }),
  errMsg: 'Sorry AI backend is not responding, please try again later.',
  timeoutMsg: 'Sorry AI backend timed out, please try again.',
  missingKey: 'API key not set.'
};