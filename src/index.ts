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
      // Special handling for known keys to match README output
      const entries = Object.entries(instruction);
      let lines: string[] = [];
      for (const [k, v] of entries) {
        if (k === 'name') {
          lines.push(`Your name: ${v} <--- Use this name at all times`);
        } else if (k === 'type' || k === 'role') {
          lines.push(`Your role is ${v}.`);
        } else if (k === 'responseType') {
          lines.push(`Response Type: You must structure your response as a ${v}.`);
        } else if (k === 'persona') {
          lines.push(`Your persona is ${v}.`);
        } else if (k === 'mood') {
          lines.push(`Your mood is ${v}.`);
        } else {
          lines.push(`Your ${k} is ${v}.`);
        }
      }
      // Add context for engineer role as in README
      if (instruction['type'] === 'engineer' || instruction['role'] === 'Engineer') {
        lines.push('Context of role:\n    An engineer is a professional who applies scientific and mathematical principles to design, develop, and innovate solutions to practical problems. Engineers are involved in inventing, designing and maintaining a variety of machines, structures and data systems. They are experts in their fields, creating and innovating constantly. Engineers use their expertise in various branches of engineering, such as civil, mechanical, electrical, chemical, or software engineering, to create, improve, and maintain systems, structures, processes, and technologies.');
      }
      this.systemInstructions.push(lines.join(' '));
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

}

// Default export: a new Prompt instance for chaining
const prompt = new Prompt();
export default prompt;