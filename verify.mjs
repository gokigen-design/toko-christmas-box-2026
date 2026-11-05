import fs from 'node:fs';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');

assert(html.includes('カードをタップすると音が出ます'), '英単語カードの音声案内がありません');
assert(html.includes('word-card__sound'), '音声マークがありません');
assert((html.match(/data-audio="assets\/audio\//g) || []).length === 8, '英単語音声が8件ではありません');
assert(html.includes('class="count-check"'), '答え合わせボタンがありません');
assert(html.includes('class="count-result"'), '答え合わせ結果の表示欄がありません');
assert(html.includes("You're right!"), '正解時の英語メッセージがありません');
assert(html.includes('Try again!'), '不正解時の英語メッセージがありません');
assert(html.includes('speechSynthesis'), '答え合わせ音声の再生処理がありません');
assert((html.match(/data-answer="/g) || []).length === 10, 'カウントゲームの正解数が10件ではありません');
assert(html.includes('© Read &amp; Talk 2026'), '著作権表記がありません');
assert(html.includes('assets/clean-crops/recipe-photo-generated.webp'), '生成したチョコトナカイ画像が使われていません');
assert(html.includes('無断転載・複製を禁じます'), '複製禁止表記がありません');
assert(!html.includes('Read &amp; Talk 2025') && !html.includes('Read & Talk 2025'), '2025表記が残っています');
assert(!html.includes('box-shadow:'), 'box-shadowを使っています');
assert(!html.includes('text-wrap: balance') && !html.includes('text-wrap: pretty'), '日本語に不向きなtext-wrapを使っています');

console.log('PASS: クリスマスBOXの音声案内と共通表記を確認しました');
