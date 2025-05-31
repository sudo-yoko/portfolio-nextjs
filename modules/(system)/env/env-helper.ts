export function env(key: string): string {
  const value = process.env[key]?.trim();
  if (!value || value.length === 0) {
    throw new Error(`環境変数 ${key} が設定されていません。`);
  }
  return value;
}

export function envNumber(key: string): number {
  const value = env(key);
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`環境変数 ${key} の形式が不正です。`);
  }
  return num;
}

export function envProtocol(key: string): 'http' | 'https' {
  const value = env(key);
  if (value === 'http' || value === 'https') {
    return value;
  }
  throw new Error(`不正なプロトコルです。[${value}]`);
}
