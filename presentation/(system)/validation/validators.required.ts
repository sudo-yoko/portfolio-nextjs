/**
 * バリデーション：必須入力
 */
export function required(name: string, value: string): string[] {
  const errors: string[] = [];
  if (!value || value.trim() === '') {
    errors.push(`${name}を入力してください。`);
  }
  return errors;
}
