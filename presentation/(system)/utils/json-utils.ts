
/**
 * JSONパースを試みる
 */
export function tryParseJson<T>(text: string): boolean {
  try {
    JSON.parse(text) as T;
    return true;
  } catch (_e) {
    return false;
  }
}
