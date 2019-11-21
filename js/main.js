'user strict'

{
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

  hiraWords = [
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
    'どくきのこ',
    'まーらいおん',
  ]

// 変数の定義
  let hiraWord; //問題の文字列を入れる変数
  let romaWord; //ローマ字の文字列を入れる変数
  let loc = 0; //入力している文字の場所
  let focus = false; //入力しているかどうか判定
  let gHira = []; //残っている単語
  let gRoma = []; //残っている単語のローマ字
  let targetId = []; //要素のId
  let focusNum; //入力されている文字の配列のindex
  let playingNow = false;
  let timeLeft;
  let startTime;
  let id;
  let timeoutId;
  let generateTarget;
  let breakTarget;
  let rate;
  const timeLimit = 30 * 1000;

  // 要素の取得
  const targetWrap = document.getElementById('targetWrap');
  const timerLabel = document.getElementById('timer');
  const start = document.getElementById('start');
  const startmodal = document.getElementById('startmodal');
  const finishModal = document.getElementById('finishModal');
  const resultModal = document.getElementById('resultModal');
  const retry = document.getElementById('retry');
  const hit = document.getElementById('hit');
  const left = document.getElementById('left');
  const finishTape = document.querySelectorAll('.finish-tape');
  let focusTarget;

// 関数の定義-----------------------------------------------------------------------
  //1文字ずつ変換する関数
  function letterHiraToRoma(hiraLetter) {
    for (let i = 0; i < hira.length; i++) {
      if (hira[i] === hiraLetter) {
        romaWord += roma[i];
      }
    }
  }

  //letterHiraToRomaに一文字づつ渡してromaWordを生成する関数
  function wordHiraToRoma (hiraWord) {
    romaWord = '';
    for (let i = 0; i < hiraWord.length + 1; i++) {//生成するひらがなのローマ字を作るための処理
    hiraLetter = hiraWord.slice(i, i + 1);
    letterHiraToRoma(hiraLetter);
    }
    return romaWord;
  }

  function wordGenerate (hiraWord, romaWord, id) {//要素生成のための関数

    //要素の取得と生成
    const target = document.createElement('div');
    const hiraTarget = document.createElement('p');
    const romaTarget = document.createElement('p');
    const remainWord = document.createElement('span');

    target.classList.add('target');
    target.dataset.targetId = id;

    hiraTarget.classList.add('hira-target');
    hiraTarget.textContent = hiraWord;


    remainWord.classList.add('remain-word');
    remainWord.textContent = romaWord;
    romaTarget.classList.add('roma-target');
    romaTarget.appendChild(remainWord);

    //位置をバラバラにするcssを書く
    const left = Math.random() * targetWrap.offsetWidth * 0.8;
    const top = Math.random() * targetWrap.offsetHeight * 0.8 - 50;
    const tgbgNum = Math.floor(Math.random() * 5) + 1;

    target.style.backgroundImage = `url(img/pink${tgbgNum}.png)`;
    target.style.top = `${top}px`;
    target.style.left = `${left}px`;

    target.appendChild(hiraTarget);
    target.appendChild(romaTarget);
    targetWrap.appendChild(target);
  }

  function pushArray(hiraWord, romaWord, id) {
    gHira.push(hiraWord);
    gRoma.push(romaWord);
    targetId.push(id);
  }

  function letterUpdate(focusNum, loc) {//正解した文字を更新する処理
    const updateElement = document.querySelector(`div[data-target-id="${targetId[focusNum]}"] .roma-target`);
    const remainWord = document.querySelector(`div[data-target-id="${targetId[focusNum]}"] .roma-target .remain-word`)
    const imgSpan = document.createElement('span');
    const img = document.createElement('img');

    imgSpan.classList.add('img-span');
    imgSpan.textContent = gRoma[focusNum].slice(loc, loc + 1);

    imgSpan.appendChild(img);
    updateElement.insertBefore(imgSpan, remainWord);

    const top = imgSpan.getBoundingClientRect().top - targetWrap.getBoundingClientRect().top;
    const left = imgSpan.getBoundingClientRect().left - targetWrap.getBoundingClientRect().left;

    const paintBallPosition = imgSpan.getBoundingClientRect()
    const paintBall = document.createElement('div');
    targetWrap.appendChild(paintBall)
    paintBall.classList.add('paint-ball');
    setTimeout( () => {
      paintBall.classList.add('hit');
      paintBall.style.top = `${top}px`;
      paintBall.style.left = `${left}px`;
      setTimeout( () => {
        targetWrap.removeChild(paintBall);
        img.src = `img/green${Math.floor(Math.random()  * 5) + 1}.png`;//imgの表示
      },120);
    },1);


    remainWord.textContent = gRoma[focusNum].substring(loc + 1);
  }

  function focusCheck() {//フォーカスしているターゲットがあるか判定しなかったらフォーカスさせる
    if (focus ==! true) {
      for (i = 0; i < gHira.length; i++) {
        if (typeKey === gRoma[i].slice(0, 1)) {
          focus = true;
          focusNum = i;
          i += gHira.length; //loop出るため
          focusTarget = document.querySelector(`div[data-target-id="${targetId[focusNum]}"]`);
          focusTarget.classList.add('focus');
        }
      }
    }
  }

  function nextTarget() {//打ち切ったターゲットの処理
    focusTarget.classList.remove('focus');
    focusTarget.classList.add('clear');
    tgbgNum = Math.floor(Math.random() * 5) + 1;
    focusTarget.style.backgroundImage = `url(img/green${tgbgNum}.png)`

    while (focusTarget.firstChild) focusTarget.removeChild(focusTarget.firstChild);//focusTargetの子要素を全削除
    focus = false;
    loc = 0;
    gHira.splice(focusNum, 1);//作った文字列の配列を消去する処理
    gRoma.splice(focusNum, 1);
    targetId.splice(focusNum, 1);
  }

  function keyCheck(typeKey) {
    focusCheck(); //フォーカスしているかのチェック
    if (gRoma[focusNum].slice(loc, loc + 1) === typeKey && focus === true) {//正誤判定
      letterUpdate(focusNum, loc);
      loc++;
      if (gRoma[focusNum].length === loc) {//文字数に達したら初期化
        breakTarget++;
        nextTarget();
      }
    }
  }

  //スタートが押された時の関数-----------------------------------------------------------------
  function targetGenerate() {
    if (playingNow === false) {
      clearTimeout(id);
      return;
    }

    id = setTimeout( () => {
      targetGenerate();
    }, 1500);
    hiraWord = hiraWords[Math.floor(Math.random() * hiraWords.length)];
    wordHiraToRoma(hiraWord);//返値はromaWord
    wordGenerate(hiraWord, romaWord, id); //要素の生成
    pushArray(hiraWord, romaWord, id); //インデックスに入れる
    generateTarget++;

  }

  function updateTimer() {//無駄なし

    timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(0);

    timeoutId = setTimeout( () => {
      updateTimer();
    }, 1000);

    if (timeLeft < 0) {
      timerLabel.textContent = 0;
      playingNow = false;
      clearTimeout(timeoutId);
      finish();
      setTimeout( () => {
        result();
      }, 1000);
    }
  }

  function gameStart() {
    //--------初期化--------
    loc = 0;
    focus = false;
    gHira = [];
    gRoma = [];
    targetId = [];
    focusNum = 0;
    generateTarget = 0;
    breakTarget = 0;

    while (targetWrap.firstChild) targetWrap.removeChild(targetWrap.firstChild);
    hit.style.width = '0%';
    left.style.width = '0%';
    hit.textContent = '0%';
    left.textContent = '0%';
    finishTape.forEach( e => {
      e.classList.remove('active');
    });
    setTimeout( () => {
      finishModal.classList.remove('active');
    }, 300);
    resultModal.classList.remove('active');
    //-------------------

    playingNow = true;
    startTime = Date.now();
    updateTimer();

    setTimeout( () => {
      targetGenerate();
    }, 1000);
  }

  function result() { //無駄なし
    resultModal.classList.add('active');
    setTimeout( () => {
      rate = (breakTarget / generateTarget * 100).toFixed(0);
      hit.style.width = `${rate}%`;
      left.style.width = `${100 - rate}%`;
      hit.textContent = `${rate}%`;
      left.textContent = `${100 - rate}%`;
    }, 1000);
  }

  function finish() {//無駄なし
    finishModal.classList.add('active');
    setTimeout( () => {
      finishTape.forEach( e => {
        e.classList.add('active');
      });
    }, 300);
  }

  //クリックイベント等-----------------------------------------------------------------

  start.addEventListener('click', () => {
    gameStart();
  });
  retry.addEventListener('click', () => {
    gameStart();
  });

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
