function getRandomStr() {
  const LENGTH = 8; //生成したい文字列の長さ
  const SOURCE = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0123456789",
    // '!#$%&=~/*-+',
  ];
  let OFFSET = SOURCE.length - 1;
  let randomConfig = []; //ランダム設定配列
  let sum = 0;
  let result = "";

  //どのSOURCEを何文字含むかをランダムで設定
  for (let i = 0; i <= OFFSET; i++) {
    let includeNum =
      i === OFFSET
        ? LENGTH - sum
        : 1 + Math.floor(Math.random() * (LENGTH - OFFSET - sum - i + 2));

    randomConfig.push({
      src: SOURCE[i], //元になるSOURCE
      includeNum: includeNum, //含む回数
      count: 0, //含まれた回数
    });
    sum += includeNum;
  }

  //指定した長さのランダムな文字列を生成
  for (let i = 0; i < LENGTH; i++) {
    let index = 1 + Math.floor(Math.random() * randomConfig.length - 1);
    let randomSource = randomConfig[index];

    //ランダムなSOURCEから文字を選んで結合
    result +=
      randomSource.src[Math.floor(Math.random() * randomSource.src.length)];

    randomSource.count++;

    //countとincludeNumが一致したらrandomConfig配列から削除
    if (randomSource.count === randomSource.includeNum) {
      randomConfig.splice(index, 1);
    }
  }

  return result; //4+iW&%2I
}

// Escキー2連打で鍵を開閉する
let escCounter = 0;
document.body.onkeydown = function (event) {
  if (event.key === "Escape") {
    escCounter += 1;
    if (escCounter >= 2) {
      // ドロワーメニューを開く
      $(".logo").trigger("click");
      // 鍵を開閉する
      $("#roomPublic").trigger("click");
      // 鍵を閉めるときパスワードをランダムに変更
      const passWord = getRandomStr();
      $(".room-pwd-field").val(passWord);
      // ドロワーを閉じる
      $(".room-setting-top-btn").trigger("click");
    } else {
      setTimeout(function () {
        escCounter = 0;
      }, 500);
    }
  }
};

// ユーザーの映像をダブルクリックでカメラオフ、カメラ権限を与奪する
document.addEventListener("dblclick", function(e) {
    if (e.target.dataset.userid) {
      // カメラボタンをクリックする
      $(`li[data-userid=${e.target.dataset.userid}]`)
        .find(".icon-global-camera")
        .trigger("click");
    }
}, false);

// ユーザーの映像を右クリックでマイクオフ、マイク権限を与奪する
document.addEventListener("contextmenu", function(e) {
    if (e.target.dataset.userid) {
      // マイクボタンをクリックする
      $(`li[data-userid=${e.target.dataset.userid}]`)
        .find(".icon-global-mic")
        .trigger("click");
      // 右クリックメニューを開かない
      e.preventDefault();
    }
}, false);
