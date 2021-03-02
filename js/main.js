'user strict'

{
  // =====================================================
  // 定数の定義
  // =====================================================
  // hiraとromaはインデックスで対応している
  const hira = [
    'あ',
    'い',
    'う',
    'え',
    'お',
    'か',
    'き',
    'く',
    'け',
    'こ',
    'さ',
    'し',
    'す',
    'せ',
    'そ',
    'た',
    'ち',
    'つ',
    'て',
    'と',
    'な',
    'に',
    'ぬ',
    'ね',
    'の',
    'は',
    'ひ',
    'ふ',
    'へ',
    'ほ',
    'ま',
    'み',
    'む',
    'め',
    'も',
    'や',
    'ゆ',
    'よ',
    'ら',
    'り',
    'る',
    'れ',
    'ろ',
    'わ',
    'を',
    'ん',
    'が',
    'ぎ',
    'ぐ',
    'げ',
    'ご',
    'ざ',
    'じ',
    'ず',
    'ぜ',
    'ぞ',
    'だ',
    'ぢ',
    'づ',
    'で',
    'ど',
    'ば',
    'び',
    'ぶ',
    'べ',
    'ぼ',
    'ぱ',
    'ぴ',
    'ぷ',
    'ぺ',
    'ぽ',
    'ー',
  ];

  const roma = [
    'a',
    'i',
    'u',
    'e',
    'o',
    'ka',
    'ki',
    'ku',
    'ke',
    'ko',
    'sa',
    'si',
    'su',
    'se',
    'so',
    'ta',
    'ti',
    'tu',
    'te',
    'to',
    'na',
    'ni',
    'nu',
    'ne',
    'no',
    'ha',
    'hi',
    'hu',
    'he',
    'ho',
    'ma',
    'mi',
    'mu',
    'me',
    'mo',
    'ya',
    'yu',
    'yo',
    'ra',
    'ri',
    'ru',
    're',
    'ro',
    'wa',
    'wo',
    'nn',
    'ga',
    'gi',
    'gu',
    'ge',
    'go',
    'za',
    'zi',
    'zu',
    'ze',
    'zo',
    'da',
    'di',
    'du',
    'de',
    'do',
    'ba',
    'bi',
    'bu',
    'be',
    'bo',
    'pa',
    'pi',
    'pu',
    'pe',
    'po',
    '-',
  ];

  hiraWords = [ //タイピングさせたい単語（ひらがなのみ）
    'はし',
    'きんし',
    'ほん',
    'いす',
    'つくえ',
    'かに',
    'うに',
    'ぐーぐる',
    'ぱそこん',
    'りよう',
    'けいたい',
    'さけ',
    'こめ',
    'おかね',
    'ねこ',
    'すいか',
    'いぬ',
    'おとこ',
    'ういるす',
    'ちいさい',
    'きりん',
    'あいらんど',
    'たなか',
    'ぱずどら',
    'かみ',
    'らんど',
    'すずき',
    'きーぼーど',
    'かーてん',
    'ふとん',
    'りんじん',
    'はんざい',
    'かばん',
    'あぷり',
    'みずごろう',
    'くるま',
    'さかみち',
    'にべあ',
    'めがね',
    'のーと',
    'あおぞら',
    'くもりぞら',
    'ふでばこ',
    'あかぺん',
    'きのこ',
    'まーらいおん',
    'みち',
    'たおる',
    'ころな',
    'えいちーむ',
    'てんき',
    'あし',
    'ぞんび',
    'ばすけ',
  ]
  const limitTime = 30 * 1000;  //プレイ時間の設定

  // =====================================================
  // 変数の定義
  // =====================================================
  let hiraWord;             //問題の文字列を入れる変数
  let romaWord;             //ローマ字の文字列を入れる変数
  let loc = 0;              //単語の中でこれから入力するローマ字の文字数目
  let focus = false;        //入力している単語があるかどうか判定
  let gHira = [];           //残っている単語
  let gRoma = [];           //残っている単語のローマ字
  let targetId = [];        //要素のId
  let focusNum;             //現在入力されている文字のgHira配列でのindex
  let playingNow = false;   //ゲーム中かどうか判定
  let remainedTime;         //残り時間の計測
  let startTime;            //ゲームスタートの時間を記憶
  let id;                   //生成された順番を記憶しておく
  let timeoutId;            //setTimeoutの戻り値を格納
  let generateTargetCount;  //生成したターゲットをカウントする
  let breakTargetCount;     //打ち切ったターゲットをカウントする
  let rate;                 //成績を入れる
  let target;               //生成するターゲットを記憶する
  let targetInner;          //生成するターゲットの中身を構築する
  let targetPositionLeft;   //ターゲットを生成する位置（X座標）を指定
  let targetPositionTop;    //ターゲットを生成する位置（Y座標）を指定
  let targetImgNum;         //ターゲットの画像の型番号を記憶
  let paintBall;            //エフェクト用に生成されたペイントボールを記憶
  let breakLetterTop;       //タイプされた1文字の位置（X座標）を格納
  let breakLetterLeft;      //タイプされた1文字の位置（Y座標）を格納
  let updateTarget;         //更新するターゲットを記憶
  let remainWord;           //フォーカスされていてまだタイプしきれていない文字を格納
  let breakLetter;          //タイプした文字を格納
  let focusTarget;          //フォーカスされているターゲットを記憶

  //=====================================================
  // 要素の取得
  //=====================================================
  const targetWrap = document.getElementById('targetWrap');
  const timerLabel = document.getElementById('timer');
  const startBtn = document.getElementById('startBtn');
  const finishModal = document.getElementById('finishModal');
  const resultModal = document.getElementById('resultModal');
  const retryBtn = document.getElementById('retryBtn');
  const success = document.getElementById('success');
  const remained = document.getElementById('remained');
  const finishTape = document.querySelectorAll('.finish-tape');
  
  // =========================================================
  // 関数の定義
  // =========================================================
  
  // ゲームのスタート・リスタートの関数
  function gameStart() {
    // 変数の初期化
    loc = 0;
    focus = false;
    gHira = [];
    gRoma = [];
    targetId = [];
    focusNum = 0;
    generateTargetCount = 0;
    breakTargetCount = 0;
    // 要素の削除・スタイルのリセット
    while (targetWrap.firstChild) targetWrap.removeChild(targetWrap.firstChild);
    success.style.width = '0%';
    remained.style.width = '0%';
    success.textContent = '0%';
    remained.textContent = '0%';
    finishTape.forEach( e => {
      e.classList.remove('active');
    });
    finishModal.classList.remove('active');
    resultModal.classList.remove('active');
    
    playingNow = true;
    startTime = Date.now();
    updateTimer();
    setTimeout( () => {
      targetGenerate();
    }, 1000);
  }
  
  // 時間の計測・残り時間が0のときにゲームを終了させる関数
  function updateTimer() {
    remainedTime = startTime + limitTime - Date.now();
    timerLabel.textContent = (remainedTime / 1000).toFixed(0);

    timeoutId = setTimeout( () => {
      updateTimer();
    }, 1000);

    if (remainedTime < 0) {
      timerLabel.textContent = 0;
      playingNow = false;
      clearTimeout(timeoutId);
      finish();
      setTimeout( () => {
        result();
      }, 1000);
    }
  }

  // ゲーム中に動作し続ける関数
  function targetGenerate() {
    if (playingNow === false) {
      clearTimeout(id);
      return;
    }
    id = setTimeout( () => {
      targetGenerate();
    }, 1500);
    wordGenerate(id);
  }
  
  // ターゲット生成のための関数
  function wordGenerate (id) {
    // 必要な情報の生成
    hiraWord = hiraWords[Math.floor(Math.random() * hiraWords.length)];
    wordHiraToRoma(hiraWord);
    pushArray(hiraWord, romaWord, id);
    generateTargetCount++;
    // DOMを形成していく
    target = document.createElement('div');
    targetInner = `<p class="hira-target">${hiraWord}</p><p class="roma-target"><span class="remain-word">${romaWord}</span></p>`;
    targetPositionLeft = Math.random() * targetWrap.offsetWidth * 0.8;
    targetPositionTop = Math.random() * targetWrap.offsetHeight * 0.7;
    targetImgNum = Math.floor(Math.random() * 5) + 1;
    target.classList.add('target');
    target.dataset.targetId = id;
    target.style.backgroundImage = `url(img/pink${targetImgNum}.png)`;
    target.style.top = `${targetPositionTop}px`;
    target.style.left = `${targetPositionLeft}px`;
    target.innerHTML = targetInner;
    targetWrap.appendChild(target);
  }

  //letterHiraToRomaに一文字づつ渡してromaWordを生成する関数
  function wordHiraToRoma (hiraWord) {
    romaWord = '';
    for (let i = 0; i <= hiraWord.length; i++) {
      hiraLetter = hiraWord.slice(i, i + 1);
      letterHiraToRoma(hiraLetter);
    }
  }

  //1文字ずつひらがなからローマ字へ変換する関数
  function letterHiraToRoma(hiraLetter) {
    for (let i = 0; i < hira.length; i++) {
      if (hira[i] === hiraLetter) {
        romaWord += roma[i];
      }
    }
  }

  // 生成した単語の情報を同じインデックスで3つの配列に格納する関数
  function pushArray(hiraWord, romaWord, id) {
    gHira.push(hiraWord);
    gRoma.push(romaWord);
    targetId.push(id);
  }
  
  // ゲーム中にタイプされたキーがあっているか判定する
  function keyCheck(typeKey) {
    focusCheck();
    if (focus && gRoma[focusNum].slice(loc, loc + 1) === typeKey ) {//正誤判定
      letterUpdate(focusNum, loc);
      loc++;
      if (loc >= gRoma[focusNum].length) {//文字数に達したら初期化
        breakTargetCount++;
        nextTarget();
      }
    }
  }

  //フォーカスしているターゲットがあるか判定して、なかったらフォーカスさせる
  function focusCheck() {
    if (!focus) {
      for (i = 0; i < gHira.length; i++) {  //残っている単語分繰り返し
        if (typeKey === gRoma[i].slice(0, 1)) {   //タイプしたキーと単語の一文字目が同じだったら
          focus = true;
          focusNum = i;
          focusTarget = document.querySelector(`div[data-target-id="${targetId[focusNum]}"]`);
          focusTarget.classList.add('focus');
          i += gHira.length; //for文をでる処理
        }
      }
    }
  }

  //タイプした文字を更新する処理
  function letterUpdate(focusNum, loc) {
    updateTarget = document.querySelector(`div[data-target-id="${targetId[focusNum]}"] .roma-target`);
    remainWord = document.querySelector(`div[data-target-id="${targetId[focusNum]}"] .roma-target .remain-word`)
    breakLetter = document.createElement('span');
    breakLetter.classList.add('break-letter', `break-letter-${Math.floor(Math.random() * 5) + 1}`);
    breakLetter.textContent = gRoma[focusNum].slice(loc, loc + 1);
    remainWord.textContent = gRoma[focusNum].substring(loc + 1);
    updateTarget.insertBefore(breakLetter, remainWord);

    // ペンキを飛ばすエフェクト用
    paintBall = document.createElement('div');
    paintBall.classList.add('paint-ball');
    targetWrap.appendChild(paintBall);
    breakLetterTop = breakLetter.getBoundingClientRect().top - targetWrap.getBoundingClientRect().top;
    breakLetterLeft = breakLetter.getBoundingClientRect().left - targetWrap.getBoundingClientRect().left;
    setTimeout( () => {
      paintBall.classList.add('hit');
      paintBall.style.top = `${breakLetterTop}px`;
      paintBall.style.left = `${breakLetterLeft}px`;
      setTimeout( () => {
        targetWrap.removeChild(paintBall);
      }, 110);
    }, 1);
  }

  // 打ち切ったターゲットを処理する関数
  function nextTarget() {
    targetImgNum = Math.floor(Math.random() * 5) + 1;
    focusTarget.style.backgroundImage = `url(img/green${targetImgNum}.png)`
    focusTarget.classList.remove('focus');
    focusTarget.classList.add('break');
    while (focusTarget.firstChild) focusTarget.removeChild(focusTarget.firstChild);
    focus = false;
    loc = 0;
    gHira.splice(focusNum, 1);
    gRoma.splice(focusNum, 1);
    targetId.splice(focusNum, 1);
  }
  
  // ゲーム終了時のフィニッシュテープを処理する関数
  function finish() {
    finishModal.classList.add('active');
    setTimeout( () => {
      finishTape.forEach( e => {
        e.classList.add('active');
      });
    }, 300);
  }

  // ゲーム終了後結果を表示する関数
  function result() {
    resultModal.classList.add('active');
    setTimeout( () => {
      rate = (breakTargetCount / generateTargetCount * 100).toFixed(0);
      success.style.width = `${rate}%`;
      remained.style.width = `${100 - rate}%`;
      success.textContent = `${rate}%`;
      remained.textContent = `${100 - rate}%`;
    }, 1000);
  }

  //=====================================================
  //クリックイベント等
  //=====================================================

  // スタート・リスタートボタンをクリックした時の処理
  startBtn.addEventListener('click', () => {
    gameStart();
  });
  retryBtn.addEventListener('click', () => {
    gameStart();
  });
  // キーを押した時の処理
  window.addEventListener('keydown', e => {
    typeKey = e.key;
    if (playingNow) {
      keyCheck(typeKey);
    } else {
      if (' ' === typeKey) {
        e.preventDefault();
        gameStart();
      }
    }
  });
}
