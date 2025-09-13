import { ActionResult } from '@/modules/(system)/types/action-result';
import { User } from '@/modules/users/models/users-types';

// 型の制約によるコンパイルエラーを確認するコード

test('test1', () => {
  const users: User[] = [{ userId: '1234', userName: 'test taro' }];
  //const result1: ActionResult<User[]> = { abort: true, data: users }; // 型の制約でコンパイルエラーになる
  const _result2: ActionResult<User[]> = { abort: true };
  const _result3: ActionResult<User[]> = { abort: false, data: users };
  //const _result4: ActionResult<User[]> = { abort: false }; // 型の制約でコンパイルエラーになる
});

test('test2', () => {
  //const _result1: ActionResult<void> = { abort: true, data: undefined }; // 型の制約でコンパイルエラーになる
  const _result2: ActionResult<void> = { abort: true };
  const _result3: ActionResult<void> = { abort: false, data: undefined };
  //const _result4: ActionResult<void> = { abort: false }; // 型の制約でコンパイルエラーになる
});

test('test3', () => {
  const users: User[] = [{ userId: '1234', userName: 'test taro' }];
  // ファクトリ経由の生成
  const _result1: ActionResult<User[]> = ActionResult.complete(users);
  const _result2: ActionResult<User[]> = ActionResult.abort();
  const _result3: ActionResult<void> = ActionResult.complete(undefined);
  const _result4: ActionResult<void> = ActionResult.abort();
  const _result5: ActionResult<undefined> = ActionResult.complete(undefined);
  const _result6: ActionResult<undefined> = ActionResult.abort();
});
