// Basic usage of littleprompt in Node.js (CommonJS)
const prompt = require('../dist/index.js').default;

const myPrompt = prompt
  .system({ type: 'engineer', name: 'Johnson' })
  .concise()
  .truthful()
  .system('is funny')
  .system({ responseType: 'structuredJSON' })
  .user('What are the first 3 steps to making a website?');

console.log(myPrompt.build());
