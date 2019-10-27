const shuffle = (array) => {
	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

class PlayKana extends HTMLElement {
  guessKana;
  kanas;
  kanaShown;
  score;
  scoreElement;
  totalKana;
  currentKana;
  button;
  kanaCount;
  constructor() {
    super();
    this.init();
    this.initKanas();
    this.buildButton();
    this.setCloseButton();
  }

  init() {
    this.guessKana = document.getElementById('guess-kana');
    this.guessInput = document.getElementById('guess-input');
    this.scoreElement = document.getElementById('current-score');
    this.totalKana = document.getElementById('total-kana');
    this.guessInput.addEventListener('input', (e) => this.handleChange(e));
    this.score = 0;
    this.kanaShown = 0;
    this.kanas = [];
    this.scoreElement.innerHTML = this.score;
  }

  buildButton() {
    this.button = document.createElement('button');
    this.button.innerHTML = 'Deviner';
    this.button.addEventListener('click', this.toggleModal.bind(this))
    document.getElementById('kana-buttons').appendChild(this.button);
  }
  
  setCloseButton() {
    this.closeModalButton = document.getElementById('close-kana');
    this.closeModalButton.addEventListener('click', this.toggleModal.bind(this))
  }

  toggleModal() {
    if(!this.hasAttribute('open')) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }

  async initKanas() {
    const resHiragana = await fetch('../datas/hiragana.json');
    const resKatakana = await fetch('../datas/katakana.json');
    const { hiragana } = await resHiragana.json();
    const { katakana } = await resKatakana.json();
    
    this.hiraganaBoard = hiragana;
    this.katakanaBoard = katakana;

    chrome.storage.local.get(['hiragana', 'katakana', 'hiraganaFrom', 'hiraganaTo', 'katakanaFrom', 'katakanaTo', 'includeTenten', 'includeMaru'], items => {
      const {hiragana, katakana, hiraganaFrom, hiraganaTo, includeTenten, includeMaru, katakanaFrom, katakanaTo } = items;
      const flatHiragana = this.hiraganaBoard.regular.flat(2)
      const flatKatakana = this.katakanaBoard.regular.flat(2)
      if(hiragana) {
        const hiraganaFromIndex = flatHiragana.findIndex(hiragana => hiragana.id === `hiragana_${hiraganaFrom}`)
        const hiraganaToIndex = flatHiragana.findIndex(hiragana => hiragana.id === `hiragana_${hiraganaTo}`)
        this.kanas.push(flatKatakana.slice(hiraganaFromIndex, hiraganaToIndex))
        if(includeTenten) this.kanas.push(this.hiraganaBoard.tenten.flat(2))
        if(includeMaru) this.kanas.push(this.hiraganaBoard.maru.flat(2))
      }
      if(katakana) {
        const katakanaFromIndex = flatKatakana.findIndex(katakana => katakana.id === `katakana_${katakanaFrom}`)
        const katakanaToIndex = flatKatakana.findIndex(katakana => katakana.id === `katakana_${katakanaTo}`)
        this.kanas.push(flatKatakana.slice(katakanaFromIndex, katakanaToIndex))
        if(includeTenten) this.kanas.push(this.katakanaBoard.tenten.flat(2))
        if(includeMaru) this.kanas.push(this.katakanaBoard.maru.flat(2))
      }
      this.kanas = shuffle(this.kanas.flat());
      this.kanaCount = this.kanas.length;
      this.totalKana.innerHTML = this.kanaCount;
      this.setRandomKana()
    });
  }

  setRandomKana() {
    this.currentKana = this.kanas.shift();
    this.kanaShown++;
    this.guessKana.innerText = this.currentKana.character;
  }

  flattenKana(kana) {
    const { regular, tenten, maru } = kana;
    return [...regular.flat(2), ...tenten.flat(2), ...maru.flat(2)]
  }

  handleChange(e) {
    const { value } = e.target;
    const { romaji } = this.currentKana;
    if(romaji.length !== value.length) return
    if(romaji === value) {
      this.score++;
    }
    this.scoreElement.innerHTML = this.score;
    this.setRandomKana();
    e.target.value = '';
  }
}

customElements.define('play-kana', PlayKana);