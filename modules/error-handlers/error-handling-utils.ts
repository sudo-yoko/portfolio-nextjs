/**
 * Errorオブジェクトの文字列表現
 */
export function serialize(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  } else if (error instanceof Error) {
    const segments: string[] = [];
    if (error.message) {
      segments.push(error.message);
    }
    if (error.name) {
      segments.push(error.name);
    }
    return segments.join('');
  } else {
    return 'unknown type error.';
  }
}
