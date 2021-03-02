'user strict'

{
  // =====================================================
  // 定数の定義
  // =====================================================
  // japaneseSyllabaryHiraganaとjapaneseSyllabaryRomaはインデックスで対応している
  const japaneseSyllabaryHiragana = [
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

  const japaneseSyllabaryRoma = [
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
    'てんき',
    'あし',
    'ぞんび',
    'ばすけ',
    'びーる',
    'かれー',
    'ぷりんと',
    'ふるぐら',
    'ぐりとぐら',
    'おうえん',
    'とーすたー',
    'ほうどう',
    'さとう',
    'わくちん',
    'ちくわ',
    'あれるぎー',
    'ふくさよう',
  ]
  const limitTime = 30 * 1000;  //プレイ時間の設定

  // =====================================================
  // 変数の定義
  // =====================================================
  let loc = 0;              //単語の中でこれから入力するローマ字の文字数目
  let focus = false;        //入力している単語があるかどうか判定
  let generatedTarget = [];
  let focusNum;             //現在入力されている文字のgHira配列でのindex
  let playingNow = false;   //ゲーム中かどうか判定
  let remainedTime;         //残り時間の計測
  let startTime;            //ゲームスタートの時間を記憶
  let targetId;                   //生成された順番を記憶しておく
  let timeoutId;            //setTimeoutの戻り値を格納
  let generatedTargetCount;  //生成したターゲットをカウントする
  let breakTargetCount;     //打ち切ったターゲットをカウントする
  let rate;                 //成績を入れる
  let targetInner;          //生成するターゲットの中身を構築する
  let targetImgNum;         //ターゲットの画像の型番号を記憶
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
    generatedTarget = [];
    targetId = 0;
    focusNum = 0;
    generatedTargetCount = 0;
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
      clearTimeout(timeoutId);
      return;
    }
    timeoutId = setTimeout( () => {
      targetGenerate();
    }, 1500);
    targetId++;
    let newTarget = new Target({id: targetId});
    generatedTarget.push(newTarget);
    generatedTargetCount++;
  }

  class Target {
    constructor( {id} ) {
      this.id = id;
      this.hiraWord = hiraWords[Math.floor(Math.random() * hiraWords.length)];
      this.romaWord = this.convertHiraganaToRoma(this.hiraWord);
      this.targetPositionLeft = Math.random() * targetWrap.offsetWidth * 0.8;
      this.targetPositionTop = Math.random() * targetWrap.offsetHeight * 0.7;
      this.targetImgNum = Math.floor(Math.random() * 5) + 1;
      this.generate();
    }

    convertHiraganaToRoma(wordHiragana) {
      let convertResult = '';
      for (let i = 0; i <= wordHiragana.length; i++) {
        let letterHiragana = wordHiragana.slice(i, i + 1);
        for (let i = 0; i < japaneseSyllabaryHiragana.length; i++) {
          if (japaneseSyllabaryHiragana[i] === letterHiragana) {
            convertResult += japaneseSyllabaryRoma[i];
          }
        }
      }
      return convertResult;
    }

    generate() {
      let targetTemplate = document.createElement('div');
      // targetTemplateのスタイルを指定
      targetTemplate.classList.add('target');
      targetTemplate.dataset.targetId = this.id;
      targetTemplate.style.backgroundImage = `url(img/pink${this.targetImgNum}.png)`;
      targetTemplate.style.top = `${this.targetPositionTop}px`;
      targetTemplate.style.left = `${this.targetPositionLeft}px`;
      // taragetTemplateの中身を作成
      targetInner = `<p class="hira-target">${this.hiraWord}</p><p class="roma-target"><span class="remain-word">${this.romaWord}</span></p>`;
      targetTemplate.innerHTML = targetInner;
      targetWrap.appendChild(targetTemplate);
    }
  }
  
  // ゲーム中にタイプされたキーがあっているか判定する
  function keyCheck(typeKey) {
    focusCheck();
    if (focus && generatedTarget[focusNum].romaWord.slice(loc, loc + 1) === typeKey ) { //正誤判定
      letterUpdate(focusNum, loc);
      loc++;
      if (loc >= generatedTarget[focusNum].romaWord.length) { //文字数に達したら初期化
        breakTargetCount++;
        nextTarget();
      }
    }
  }

  //フォーカスしているターゲットがあるか判定して、なかったらフォーカスさせる
  function focusCheck() {
    if (!focus) {
      for (i = 0; i < generatedTarget.length; i++) {  //残っている単語分繰り返し
        if (typeKey === generatedTarget[i].romaWord.slice(0, 1)) {  //タイプしたキーと単語の一文字目が同じだったら
          focus = true;
          focusNum = i;
          focusTarget = document.querySelector(`div[data-target-id="${generatedTarget[focusNum].id}"]`);
          focusTarget.classList.add('focus');
          i += generatedTarget.length; //for文をでる処理
        }
      }
    }
  }

  //タイプした文字を更新する処理
  function letterUpdate(focusNum, loc) {
    updateTarget = document.querySelector(`div[data-target-id="${generatedTarget[focusNum].id}"] .roma-target`);
    remainWord = document.querySelector(`div[data-target-id="${generatedTarget[focusNum].id}"] .roma-target .remain-word`);
    breakLetter = document.createElement('span');
    breakLetter.classList.add('break-letter', `break-letter-${Math.floor(Math.random() * 5) + 1}`);
    breakLetter.textContent = generatedTarget[focusNum].romaWord.slice(loc, loc + 1);
    remainWord.textContent = generatedTarget[focusNum].romaWord.substring(loc + 1);
    updateTarget.insertBefore(breakLetter, remainWord);
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
    generatedTarget.splice(focusNum, 1);
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
      rate = (breakTargetCount / generatedTargetCount * 100).toFixed(0);
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
