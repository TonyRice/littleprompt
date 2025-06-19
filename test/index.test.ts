import prompt, { Prompt } from '../src';

// Use Jest global types for test and expect

describe('littleprompt', () => {
  it('should build a prompt with string system instructions', () => {
    const p = prompt
      .system('You are a helpful assistant.')
      .system('You specialize in creative writing.')
      .build();
    expect(p).toContain('System:');
    expect(p).toContain('You are a helpful assistant.');
    expect(p).toContain('You specialize in creative writing.');
  });

  it('should build a prompt with object system instructions', () => {
    const p = prompt
      .system({ persona: 'Shakespearean poet', mood: 'dramatic' })
      .build();
    expect(p).toContain('Your persona is Shakespearean poet.');
    expect(p).toContain('Your mood is dramatic.');
  });

  it('should use user() and problem() as aliases', () => {
    const p1 = prompt
      .system('You are a world-class chef.')
      .user('How do I make a perfect omelette?')
      .build();
    expect(p1).toContain('User: How do I make a perfect omelette?');
    const p2 = prompt
      .system('You are a world-class chef.')
      .problem('How do I make a perfect omelette?')
      .build();
    expect(p2).toContain('User: How do I make a perfect omelette?');
  });

  it('should apply one-liner modifiers', () => {
    const p = prompt
      .concise()
      .detailed()
      .truthful()
      .json({ id: '<number>', name: '<string>', isStudent: '<boolean>' })
      .mood('funny')
      .expert('quantum physics')
      .build();
    expect(p).toContain('Your answers must be concise.');
    expect(p).toContain('Your answers must be comprehensive and detailed.');
    expect(p).toContain('If you do not know the answer, say so.');
    expect(p).toContain('You must structure your response as a JSON data type.');
    expect(p).toContain('JSON Response Structure:');
    expect(p).toContain('Your mood is funny.');
    expect(p).toContain('You are an expert in quantum physics.');
  });

  it('should match the advanced persona example', () => {
    const GrumpyReviewer = () => {
      return new Prompt()
        .system({ persona: 'Senior Engineer', role: 'Code Reviewer' })
        .mood('incredibly grumpy')
        .concise();
    };
    const reviewPrompt = GrumpyReviewer()
      .user('Please review my amazing new function that sorts an array using bubble sort.')
      .build();
    expect(reviewPrompt).toContain('Your persona is Senior Engineer.');
    expect(reviewPrompt).toContain('Your role is Code Reviewer.');
    expect(reviewPrompt).toContain('Your mood is incredibly grumpy.');
    expect(reviewPrompt).toContain('Your answers must be concise.');
    expect(reviewPrompt).toContain('User: Please review my amazing new function that sorts an array using bubble sort.');
  });
});
