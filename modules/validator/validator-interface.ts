export type Errors = string[];
export interface Validator {
  validate(name: string, value: unknown): Errors;
}
