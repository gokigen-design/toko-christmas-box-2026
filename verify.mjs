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
assert(['step-5.webp', 'step-6.webp', 'step-7.webp'].every(name => html.includes(`assets/recipe/${name}`)), '高画質のチョコトナカイ工程画像が設定されていません');
assert(html.includes('assets/downloads/christmas-special-box-2026.pdf'), '2026年版PDFが設定されていません');
assert(!html.includes('1FIVM52TUryKrjlWNY06_da8K8h5WV_H0'), '古いPDFリンクが残っています');
assert(html.includes('https://www.youtube-nocookie.com/embed/gsF97AKL_SM'), '修正版クッキング動画が設定されていません');
assert(!html.includes('クッキング動画は準備中です'), '動画準備中の案内が残っています');
assert(html.includes('無断転載・複製を禁じます'), '複製禁止表記がありません');
assert(!html.includes('Read &amp; Talk 2025') && !html.includes('Read & Talk 2025'), '2025表記が残っています');
assert(!html.includes('box-shadow:'), 'box-shadowを使っています');
assert(!html.includes('text-wrap: balance') && !html.includes('text-wrap: pretty'), '日本語に不向きなtext-wrapを使っています');

console.log('PASS: クリスマスBOXの音声案内と共通表記を確認しました');
