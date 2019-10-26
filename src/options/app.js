class Settings {
  checkboxes;
  hiragana;
  katakana;
  romajiKana;
  displayTranslation;
  furigana;
  dropdownKanas;

  constructor() {
    this.checkboxes = document.querySelectorAll('input[type="checkbox"]');
    this.hiragana = document.getElementById('hiragana')
    this.katakana = document.getElementById('katakana')
    this.romajiKana = document.getElementById('displayRomaji')
    this.displayTranslation = document.getElementById('displayTranslation')
    this.furigana = document.getElementById('furigana')
    this.includeMaru = document.getElementById('includeMaru')
    this.includeTenten = document.getElementById('includeTenten')
    this.dropdownKanas = document.getElementsByClassName('dropdown-kana');
    
    this.init();
    this.listenCheckboxes();
    this.listenKanaChanges();
  }

  init() {
    chrome.storage.local.get(null, items => {
      const { hiragana, katakana, romajiKana, furigana, displayTranslation, includeMaru, includeTenten } = items;
      this.hiragana.checked = !!hiragana;
      this.katakana.checked = !!katakana;
      this.romajiKana.checked = !!romajiKana;
      this.displayTranslation.checked = !!displayTranslation;
      this.furigana.checked = !!furigana;
      this.includeMaru.checked = !!includeMaru;
      this.includeTenten.checked = !!includeTenten;
    });
  }
  
  listenKanaChanges() {
    for(let i=0; i < this.dropdownKanas.length; i++){
      this.dropdownKanas[i].addEventListener('change', (e) => {
        const key = e.target.getAttribute('data-kana')
        const value = e.target.value
        this.saveKey(key, value);
      })
    }
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