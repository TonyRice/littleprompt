// Example: Reusable persona in Node.js (CommonJS)
const { Prompt } = require('../dist/index.js');

const GrumpyReviewer = () => {
  return new Prompt()
    .system({ persona: 'Senior Engineer', role: 'Code Reviewer' })
    .mood('incredibly grumpy')
    .concise();
};

const reviewPrompt = GrumpyReviewer()
  .user('Please review my amazing new function that sorts an array using bubble sort.')
  .build();

console.log(reviewPrompt);
