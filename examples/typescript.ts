// Example usage of littleprompt in TypeScript
import prompt from '../src';

const myPrompt = prompt
  .system({ type: 'engineer', name: 'Johnson' })
  .concise()
  .truthful()
  .system('is funny')
  .system({ responseType: 'structuredJSON' })
  .user('What are the first 3 steps to making a website?');

console.log(myPrompt.build());
