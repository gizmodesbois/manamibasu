class Settings {
  checkboxes;
  hiragana;
  katakana;
  romajiKana;
  displayTranslation;
  furigana;

  constructor() {
    this.checkboxes = document.querySelectorAll('input[type="checkbox"]');
    this.hiragana = document.getElementById('hiragana')
    this.katakana = document.getElementById('katakana')
    this.romajiKana = document.getElementById('displayRomaji')
    this.displayTranslation = document.getElementById('displayTranslation')
    this.furigana = document.getElementById('furigana')
    this.init();
    this.listenCheckboxes();
  }

  init() {
    chrome.storage.local.get(null, items => {
      const { hiragana, katakana, romajiKana, furigana, displayTranslation } = items;
      this.hiragana.checked = !!hiragana;
      this.katakana.checked = !!katakana;
      this.romajiKana.checked = !!romajiKana;
      this.displayTranslation.checked = !!displayTranslation;
      this.furigana.checked = !!furigana;
    });
  }

  saveKey(key, value) {
    chrome.storage.local.set({[key]: value});
  }

  listenCheckboxes() {
    [...this.checkboxes].map(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.saveKey(e.target.id, e.target.checked)
      })
    })
  }
}

new Settings();