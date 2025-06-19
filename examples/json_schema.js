// Example: Using the .json() modifier with a schema in Node.js (CommonJS)
const prompt = require('../dist/index.js').default;

const schema = {
  id: '<number>',
  name: '<string>',
  isStudent: '<boolean>'
};

const myPrompt = prompt
  .system('You are a data API.')
  .json(schema)
  .user('Give me a sample user record.');

console.log(myPrompt.build());
