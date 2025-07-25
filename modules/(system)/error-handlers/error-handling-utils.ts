/**
 * Errorオブジェクトの文字列表現
 */
export function serialize(error: unknown, description?: string): string {
  if (typeof error === 'string') {
    const message = error;
    return buildMessage({ description, message });
  } else if (error instanceof Error) {
    const { message } = error;
    const stacks = getStackTrace(error);
    return buildMessage({ description, message, stacks });
  } else {
    const message = 'unknown type error.';
    return buildMessage({ description, message });
  }
}

/**
 * Errorオブジェクトからスタックトレースを取得する
 *
 * @param error - Errorオブジェクト
 * @returns スタックトレースの配列
 */
function getStackTrace(error: Error): string[] {
  const stacks: string[] = [];
  if (error.stack) stacks.push(error.stack);
  let { cause } = error;
  while (cause instanceof Error) {
    if (cause.stack) stacks.push(cause.stack);
    cause = cause.cause;
  }
  // スタックトレースを発生した順番に並べ替える
  return stacks.reverse();
}

/**
 * エラーメッセージを組み立てる
 *
 * @param description - エラーの説明
 * @param message - エラーメッセージ
 * @param details - エラー詳細
 * @param stack - スタックトレース
 * @returns エラーメッセージ
 */
function buildMessage({
  description,
  message,
  details,
  stacks,
}: {
  description?: string;
  message?: string;
  details?: string;
  stacks?: string[];
}): string {
  const errMessage: string[] = [];
  if (description) {
    errMessage.push(description);
  }
  if (message) {
    errMessage.push(`\nmessage: ${message}`);
  }
  if (details) {
    errMessage.push(`\ndetails: ${details}`);
  }
  if (stacks) {
    errMessage.push(`\nstacks: \n${stacks?.join('\n')}`);
  }
  return errMessage.join('');
}
