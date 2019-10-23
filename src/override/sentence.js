class Sentence {
  sentences;
  japaneseWord;
  romajiWord;
  translatedWord;

  constructor() {
    this.japaneseWord = document.getElementById('japanese-word');
    this.romajiWord = document.getElementById('romaji-word');
    this.translatedWord = document.getElementById('translated-word');
    this.init();
  }

  init = async () => {
    const response = await fetch('../datas/sentences.json');
    const { sentences } = await response.json();
    this.sentences = sentences;

    this.setRandomWord();
    this.listenKeyboard();
  }

  setRandomWord() {
    const {japanese, characters, romaji, translation, include_furigana } = this.sentences[Math.floor(Math.random()*this.sentences.length)];
    if(include_furigana) {
      this.japaneseWord.innerHTML = null;
      this.japaneseWord.appendChild(this._createSentenceFurigana(characters))
    } else {
      this.japaneseWord.innerHTML = japanese;
    }
    this.romajiWord.innerHTML = `🇯🇵 ${romaji}`;
    this.translatedWord.innerHTML = `🇫🇷 ${translation}`;
  }

  listenKeyboard() {
    document.body.addEventListener('keydown', (e) => {
      if(e.code === "Space") {
        this.setRandomWord();
      }
    })
  }

  _createSentenceFurigana(characters) {
    const documentFragment = document.createDocumentFragment();
    characters.map(({ main, furigana }) => {
      const span = document.createElement("SPAN")
      span.innerHTML = main;
      span.classList = "jp";
      if(furigana) span.setAttribute("data-reading", furigana);
      return documentFragment.appendChild(span)
    })
    return documentFragment;
  }
}

new Sentence();