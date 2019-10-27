const availableLanguages = ['fr', 'en'];
const navigatorLanguage = navigator.language.slice(0,2);
const includedLanguage = availableLanguages.includes(navigatorLanguage);

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
    const sentencesJson = await fetch('../datas/sentences/index.json');
    const languageJson = await fetch(`../datas/sentences/${includedLanguage ? navigatorLanguage : 'fr'}.json`);
    const { sentences } = await sentencesJson.json();
    const { translations } = await languageJson.json();
    const sentencesTranslations = sentences.map(sentence => {
      return {
        ...sentence,
        translation: translations.find(translation => translation.sentence_id === sentence.id).translation,
      }
    })
    this.sentences = sentencesTranslations;

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