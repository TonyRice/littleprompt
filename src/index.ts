/**
 * Prompt builder for littleprompt.
 * Chain system/user/problem/modifier instructions to build a prompt.
 */
export type SystemInstruction = string | Record<string, any>;

export class Prompt {
  private systemInstructions: string[] = [];
  private userInstruction: string | null = null;

  /** Add a system instruction (string or object). */
  system(instruction: SystemInstruction): this {
    if (typeof instruction === 'string') {
      this.systemInstructions.push(this._formatSystemString(instruction));
    } else if (typeof instruction === 'object' && instruction !== null) {
      this.systemInstructions.push(this._formatSystemObject(instruction));
    }
    return this;
  }

  /** Alias for user(). */
  problem(instruction: string): this {
    return this.user(instruction);
  }

  /** Set the user instruction. */
  user(instruction: string): this {
    this.userInstruction = instruction;
    return this;
  }

  /** Require concise answers. */
  concise(): this {
    return this.system('Your answers must be concise.');
  }

  /** Require detailed answers. */
  detailed(): this {
    return this.system('Your answers must be comprehensive and detailed.');
  }

  /** Require truthfulness. */
  truthful(): this {
    return this.system('If you do not know the answer, say so.');
  }

  /**
   * Require a JSON response. Optionally specify a schema.
   * @param schema Optional JSON schema for the response
   */
  json(schema?: Record<string, string>): this {
    this.system('You must structure your response as a JSON data type.');
    if (schema) {
      this.system('JSON Response Structure: ' + JSON.stringify(schema, null, 2));
    } else {
      this.system('JSON Response Structure: {}');
    }
    return this;
  }

  /** Set the mood/tone. */
  mood(feeling: string): this {
    return this.system(`Your mood is ${feeling}.`);
  }

  /** Require expertise in a field. */
  expert(field: string): this {
    return this.system(`You are an expert in ${field}.`);
  }

  /** Build the final prompt string. */
  build(): string {
    let sys = this.systemInstructions.length
      ? 'System: ' + this.systemInstructions.join(' ')
      : '';
    let user = this.userInstruction ? `\n\nUser: ${this.userInstruction}` : '';
    return sys + user;
  }

  // --- Helpers ---
  /** Format a system string instruction. */
  private _formatSystemString(str: string): string {
    // Capitalize first letter, ensure period at end.
    let s = str.trim();
    if (!s.endsWith('.')) s += '.';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /** Format a system object instruction. */
  private _formatSystemObject(obj: Record<string, any>): string {
    // Convert object keys/values to readable instructions.
    return Object.entries(obj)
      .map(([k, v]) => `Your ${k} is ${v}.`)
      .join(' ');
  }
}

// Default export: a new Prompt instance for chaining
const prompt = new Prompt();
export default prompt;