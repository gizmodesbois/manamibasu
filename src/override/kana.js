class Kana {
  kanas;
  kanaElement;
  romajiKanaElement;
  hiraganaBoard;
  katakanaBoard;

  constructor() {
    this.kanaElement = document.getElementById('kana');
    this.romajiKanaElement = document.getElementById('romajiKana');
    this.init();
  }

  init = async () => {
    const resHiragana = await fetch('../datas/hiragana.json');
    const resKatakana = await fetch('../datas/katakana.json');
    const { hiragana } = await resHiragana.json();
    const { katakana } = await resKatakana.json();
    
    this.hiraganaBoard = hiragana
    this.katakanaBoard = katakana

    this.kanas = [...this.flattenKana(this.hiraganaBoard), ...this.flattenKana(this.katakanaBoard)];

    this.setRandomKana();
    this.listenKeyboard();
  }

  setRandomKana() {
    const kana = this.kanas[Math.floor(Math.random()*this.kanas.length)];
    this.kanaElement.innerText = kana.character;
    this.romajiKanaElement.innerText = kana.romaji;
  }

  listenKeyboard() {
    document.body.addEventListener('keydown', (e) => {
      if(e.code === "KeyK") {
        this.setRandomKana();
      }
    })
  }

  flattenKana(kana) {
    const { regular, tenten, maru } = kana;
    return [...regular.flat(2), ...tenten.flat(2), ...maru.flat(2)]
  }
}

new Kana();