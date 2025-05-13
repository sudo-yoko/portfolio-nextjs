'use client';
import debug from '@/modules/loggers/logger-debug';

export function resizeTextarea(textarea: HTMLTextAreaElement) {
  const PADDING_Y = 4; // textareaの上下paddingの値＋上下border値
  const lineHeightStr =
    getComputedStyle(textarea).getPropertyValue('line-height');
  const lineHeight = lineHeightStr.replace(
    /[^-\d\.]/g,
    '',
  ) as unknown as number;
  debug(`lineHeight=${lineHeight}`);

  const lines = (textarea.value + '\n').match(/\n/g)!.length;
  debug(`lines=${lines}`);

  const elementHeightStr =
    getComputedStyle(textarea).getPropertyValue('height');
  const elementHeight = elementHeightStr.replace(
    /[^-\d\.]/g,
    '',
  ) as unknown as number;
  debug(`elementHeight=${elementHeight}`);

  if (elementHeight - PADDING_Y < lineHeight * lines) {
    textarea.style.height = lineHeight * lines + PADDING_Y + 'px';
  }
}
