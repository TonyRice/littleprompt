# littleprompt 🤏

Crafting powerful LLM prompts doesn't have to be a big deal. `littleprompt` is a tiny, chainable, and fun TypeScript/Node.js library that helps you build effective and structured prompts by incrementally adding instructions.

It's not magic, and it's not going to revolutionize AI. 🤖 At the end of the day, it's just a slick way to organize and simplify your prompt engineering inside your codebase, making your life just a little bit easier.

# 🚀 Installation

```bash
npm install littleprompt
```

# ⚡️ The Gist

Tired of messy string concatenation and rigid prompt builders? `littleprompt` lets you build prompts piece by piece.

The actual gist:

```typescript
import prompt from "littleprompt";

// Chain system instructions, modifiers, and the user's query together.
const myPrompt = prompt
  .system({ type: "engineer", name: "Johnson" }) // Start with an object
  .concise()
  .truthful()
  .system("is funny") // Add more instructions as a string
  .system({ responseType: "structuredJSON" }) // Even add formatting rules
  .user("What are the first 3 steps to making a website?"); // Finally, add the user's question

console.log(myPrompt.build());
```

**Resulting Prompt:**

```
System: 
  Your name: Johnson <--- Use this name at all times
  Role: Engineer
  Context of role:
    An engineer is a professional who applies scientific and mathematical principles to design, develop, and innovate solutions to practical problems. Engineers are involved in inventing, designing and maintaining a variety of machines, structures and data systems. They are experts in their fields, creating and innovating constantly. Engineers use their expertise in various branches of engineering, such as civil, mechanical, electrical, chemical, or software engineering, to create, improve, and maintain systems, structures, processes, and technologies.
  Instruction: Your answers must be concise. If you do not know the answer, say so. 
  Instruction: Your personality is funny. 
  Response Type: You must structure your response as a JSON data type.
  JSON Response Structure: {}

User: What are the first 3 steps to making a website?
```

# 📖 How It Works

The core idea is to start with `prompt` and chain methods to build up your instructions for the System and the User.

### The Core: `system()`

This is the heart of `littleprompt`. You can chain `.system()` calls as many times as you like to build up the AI's personality and instructions. It's smart enough to handle strings and objects.

**Using Strings:**
Each string is added as a new sentence in the system instructions.

```typescript
const p = prompt
    .system("You are a helpful assistant.")
    .system("You specialize in creative writing.")
    .build();
// System: You are a helpful assistant. You specialize in creative writing.
```

**Using Objects:**
`littleprompt` will intelligently convert simple objects into instructions. This is great for defining personas or structured rules.

```typescript
const p = prompt
    .system({ persona: "Shakespearean poet", mood: "dramatic" })
    .build();
// System: Your persona is a Shakespearean poet. Your mood is dramatic.
```

### The Ask: `user()` or `problem()`

Once you've set the stage with `.system()`, tell the AI what you want it to do with `.user()`. You can also use the alias `.problem()` if it fits your mental model better\!

```typescript
const p = prompt
    .system("You are a world-class chef.")
    .user("How do I make a perfect omelette?")
    .build();
```

### One-Liner Modifiers ✨

For common instructions, `littleprompt` provides simple, chainable shortcuts. These are just handy functions that call `.system()` with a pre-defined message under the hood.

  * `.concise()`: Instructs the AI to give short, to-the-point answers.
  * `.detailed()`: Asks for a comprehensive, detailed response.
  * `.truthful()`: Tells the AI to admit when it doesn't know something.
  * `.json(schema)`: A powerful helper to ask for a JSON response. You can provide an optional schema object for structure.
    ```typescript
    .json({
        id: "<number>",
        name: "<string>",
        isStudent: "<boolean>"
    })
    ```
  * `.mood(feeling)`: Sets the tone, e.g., `.mood("funny")` or `.mood("professional")`.
  * `.expert(field)`: Asks the AI to act as an expert, e.g., `.expert("quantum physics")`.

### Putting It All Together: `.build()`

When your prompt is ready, call `.build()` to get the final, formatted string.

# 🎭 Advanced Example: Reusable Personas

You can easily create functions that return a pre-configured `littleprompt` chain. This makes it trivial to reuse complex personas.

```typescript
import prompt, { type Prompt } from "littleprompt";

// Define a reusable persona for a grumpy but brilliant code reviewer
const GrumpyReviewer = () => {
    return prompt
        .system({ persona: "Senior Engineer", role: "Code Reviewer" })
        .mood("incredibly grumpy")
        .concise();
}

// Now, use that persona for a specific task
const reviewPrompt = GrumpyReviewer()
    .user("Please review my amazing new function that sorts an array using bubble sort.")
    .build();

console.log(reviewPrompt);
```

**Resulting Prompt:**

```
System: Your persona is a Senior Engineer. Your role is Code Reviewer. Your mood is incredibly grumpy. Your answers must be concise.

User: Please review my amazing new function that sorts an array using bubble sort.
```

# 🧑‍💻 Development

Want to contribute and make `littleprompt` even better? Awesome\!

1.  Fork the repository.
2.  Make your changes. Add a new modifier, fix a bug, improve documentation.
3.  Run the tests to make sure everything is still working.

<!-- end list -->

```bash
# install dependencies
npm install

# run tests
npm test

# build the project for distribution
npm run build
```

We welcome all contributions with open arms\! 🤗
