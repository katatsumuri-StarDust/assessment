'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return; // 名前の文字列の長さが 0 だった場合 return を実行する。
    } // 関数の途中にある return の後ろに 戻り値 を設定していないので、戻り値なしで関数が終了する。

    // 診断結果表示エリアの作成
    resultDivision.innerText = ''; // 診断結果表示エリアの内側の文字列を空文字列に変更することで、子要素を全削除する。
    const header = document.createElement('h3'); // createElement 関数で「診断結果」という h3 の見出しを作る。
    header.innerText = '診断結果';
    resultDivision.appendChild(header); // appendChild 関数で結果の div 要素に追加する。

    const paragraph = document.createElement('p'); // createElement 関数で、p 要素を作成する。
    const result = assessment(userName); // assessment 関数で診断結果の文字列を取得し、p 要素の中の文字列として設定する。
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph); // appendChild 関数で、div 要素 の子要素として p 要素を追加する。

    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a'); // 新規に a 要素を作成する。
    const hrefValue = // a 要素の href 属性に設定するための URI を変数に代入する。
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') + // + を使った文字列結合で、URI エンコードされた「あなたのいいところ」という文字列を結合する。
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);


    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

// Enter キーで診断する処理を追加
userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      // Enter が押されたときに実行する処理
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことにみんなが共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  '###userName###のいいところは優しさです。###userName###の優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字コード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  // ###userName### をユーザーの名前に置き換える
  result = result.replaceAll('###userName###',userName);
  return result;
}

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  // 太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
      '太郎のいいところはユニークさです。太郎だけのその特徴が皆を楽しくさせます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  // 次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
      '次郎のいいところはその全てです。ありのままの次郎自身がいいところなのです。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  // 花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
      '花子のいいところは情熱です。花子の情熱に周りの人は感化されます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('診断結果の文章のテスト終了');

  console.log('同じ名前なら、同じ結果を出力することのテスト');

  console.log('太郎');
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}

test();



/*
  1. いいところを診断できます
    1. 名前を入力すると診断できます
    2. 同じ名前なら、必ず同じ診断結果が出ます
    3. 診断後に、自分の名前入りの診断結果が表示されます
  2. 診断結果を X (旧 Twitter) に、ポスト(ツイート)できます
*/
