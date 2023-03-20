export function App({ app }) {
  return (
    <div class="mt-4 border border-black rounded shadow-md bg-white max-w-3xl mx-auto">
      <div class="text-xl bg-blue-100 p-2">
        {app.title} by {app.author}
      </div>
      <div class="text-xl p-2 border-b">作品概要</div>
      <div class="p-2 whitespace-pre-wrap">{app.description}</div>
      <div class="text-xl p-2 border-b">審査委員のコメント</div>
      <div>
        <div class="p-2 whitespace-pre-wrap">{app.comment}</div>
      </div>
    </div>
  );
}
