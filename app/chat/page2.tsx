export default function Page() {
  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-xl font-bold">AI チャット</h1>
      <div className="mb-4 h-64 overflow-y-auto rounded border bg-white p-3 shadow">
        <div className="mb-2 text-sm text-blue-600">
          <strong>あなた:</strong>aaaaa
        </div>
      </div>
      <div className="flex gap-2">
        <input
          placeholder="メッセージを入力"
          className="flex-1 rounded border px-2 py-1"
        />
        <button className="rounded bg-blue-500 px-3 py-1 text-white">
          送信
        </button>
      </div>
    </div>
  );
}
