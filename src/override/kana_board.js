class KanaBoard extends HTMLElement {
  button;
  closeModalButton;
  hiraganaSwitch;
  katakanaSwitch;

  constructor() {
    super()
    this.init();
    this.buildButton();
    this.setCloseButton();
    this.buildKanaList();
  }

  init() {
    this.hiraganaSwitch = document.getElementById('hiragana-switch');
    this.hiraganaSwitch.addEventListener('click', () => this.toggleKana('hiragana', 'katakana'))
    this.katakanaSwitch = document.getElementById('katakana-switch');
    this.katakanaSwitch.addEventListener('click', () => this.toggleKana('katakana', 'hiragana'))    
  }

  buildButton() {
    this.button = document.createElement('button');
    this.button.innerHTML = 'Montrer les kanas';
    this.button.addEventListener('click', this.toggleModal.bind(this))
    document.getElementById('kana-buttons').appendChild(this.button);
  }

  setCloseButton() {
    this.closeModalButton = document.getElementById('close-modal');
    this.closeModalButton.addEventListener('click', this.toggleModal.bind(this))
  }

  async buildKanaList() {
    const resHiragana = await fetch('../datas/hiragana.json');
    const resKatakana = await fetch('../datas/katakana.json');
    const { hiragana } = await resHiragana.json();
    const { katakana } = await resKatakana.json();

    const hiraganaMainList = document.getElementById('hiragana-card-main-list');
    const katakanaMainList = document.getElementById('katakana-card-main-list');
    hiragana.regular.map(row => {
      const rowHTML = this.createLine(row)
      hiraganaMainList.appendChild(rowHTML);
    });
    hiraganaMainList.appendChild(this.buildTitle('Tenten'))
    hiragana.tenten.map(row => {
      const rowHTML = this.createLine(row)
      hiraganaMainList.appendChild(rowHTML);
    });
    hiraganaMainList.appendChild(this.buildTitle('Maru'))
    hiragana.maru.map(row => {
      const rowHTML = this.createLine(row)
      hiraganaMainList.appendChild(rowHTML);
    });
    katakana.regular.map(row => {
      const rowHTML = this.createLine(row)
      katakanaMainList.appendChild(rowHTML);
    });
    katakanaMainList.appendChild(this.buildTitle('Tenten'))
    katakana.tenten.map(row => {
      const rowHTML = this.createLine(row)
      katakanaMainList.appendChild(rowHTML);
    });
    katakanaMainList.appendChild(this.buildTitle('Maru'))
    katakana.maru.map(row => {
      const rowHTML = this.createLine(row)
      katakanaMainList.appendChild(rowHTML);
    });
  }

  toggleModal() {
    if(!this.hasAttribute('open')) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }

  createLine(list) {
    const documentFragment = document.createDocumentFragment();
    const listItem = document.createElement('ul');
    listItem.classList = 'kana-card-list';
    list.map(({ character, romaji }) => {
      const li = document.createElement('li');
      li.classList = 'kana-card'
      const characterSpan = document.createElement('span');
      const romajiSpan = document.createElement('span');
      characterSpan.classList = 'jp kana-value';
      characterSpan.innerText = character;
      romajiSpan.classList = 'kana-romaji';
      romajiSpan.innerText = romaji;
      li.appendChild(characterSpan)
      li.appendChild(romajiSpan)
      return documentFragment.appendChild(li)
    })
    listItem.appendChild(documentFragment);
    return listItem;
  }

  toggleKana(openedKana, closedKana) {
    this.setAttribute(openedKana, '');
    this.removeAttribute(closedKana);
  }

  buildTitle(title) {
    const titleElement = document.createElement('h2');
    titleElement.innerHTML = title;
    titleElement.classList = 'kana-board-title';
    return titleElement;
  }
}

customElements.define('kana-board', KanaBoard);