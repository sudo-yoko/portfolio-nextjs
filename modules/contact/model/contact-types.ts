// お問い合わせフォームのモデル定義

export type Step = 'input' | 'confirm' | 'sending' | 'complete';

/**
 * 入力フォームのキー。
 * お名前、メールアドレス、お問い合わせ内容
 */
export type FormKeys = 'name' | 'email' | 'body';

/**
 * フォームの値を格納するオブジェクトの定義
 */
//export type FormData = {
//  [key in FormKey]: string;
//};
