export interface Validator {
  (name: string, value: string): string[];
}

export interface ValidationErrors {
  [key: string]: string[];
}

/**
 * 必須チェック
 */
export const required: Validator = (name, value) => {
  const errors: string[] = [];
  if (value.trim() === '') {
    errors.push(`${name}を入力してください。`);
  }
  return errors;
};
