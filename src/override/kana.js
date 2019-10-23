class Kana {
  kanas;
  kanaElement;
  romajiKanaElement;

  constructor() {
    this.kanaElement = document.getElementById('kana');
    this.romajiKanaElement = document.getElementById('romajiKana');
    this.init();
  }

  init = async () => {
    const resHiragana = await fetch('../datas/hiragana.json');
    const resKatakana = await fetch('../datas/katakana.json');
    const hiraganas = await resHiragana.json();
    const katakanas = await resKatakana.json();
    this.kanas = [...hiraganas, ...katakanas];

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
}

new Kana();