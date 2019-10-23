class Kanji {
  kanjis;
  kanji;
  kanjiRomaji;
  translatedWord;

  constructor() {
    this.kanji = document.getElementById('kanji');
    this.kanjiRomaji = document.getElementById('kanji-romaji');
    this.translatedWord = document.getElementById('kanji-translated');
    this.init();
  }

  init = async () => {
    const response = await fetch('../datas/kanji.json');
    const { kanjis } = await response.json();
    this.kanjis = kanjis;

    this.setRandomKanji();
    this.listenKeyboard();
  }

  setRandomKanji() {
    const randomWord = this.kanjis[Math.floor(Math.random()*this.kanjis.length)];
    this.kanji.innerText = randomWord.kanji;
    this.kanji.setAttribute("data-reading", randomWord.furigana);
    this.kanjiRomaji.innerText = `🇯🇵 ${randomWord.romaji}`;
    this.translatedWord.innerText = `🇫🇷 ${randomWord.translation}`;
  }

  listenKeyboard() {
    document.body.addEventListener('keydown', (e) => {
      if(e.code === "KeyJ") {
        this.setRandomKanji();
      }
    })
  }
}

new Kanji();