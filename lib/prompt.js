module.exports = (userPromt) => `Answer "${userPromt}" in the tone of a friendly, 
helpful AI assistant using the following text and if not found, say something nice. 
${process.env.WHOAMI_PROMPT}`