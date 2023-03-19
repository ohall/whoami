module.exports = (userPromt, whoamiPrompt) => `Answer the question "${userPromt}"? Which is a question about Oakley asked by a user who is not Oakley in the tone of a friendly, 
helpful AI assistant using the following text and if not found, offer some suggestinos of questions you can answer. 
${whoamiPrompt}`