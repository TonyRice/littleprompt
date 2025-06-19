// Example: Using one-liner modifiers in Node.js (CommonJS)
const prompt = require('../dist/index.js').default;

const myPrompt = prompt
  .system('You are a helpful assistant.')
  .concise()
  .detailed()
  .truthful()
  .mood('professional')
  .expert('history')
  .user('Tell me about the fall of the Roman Empire.');

console.log(myPrompt.build());
