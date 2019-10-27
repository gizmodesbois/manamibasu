class Settings {
  checkboxes;
  hiragana;
  katakana;
  romajiKana;
  displayTranslation;
  furigana;
  dropdownKanas;
  typographies;

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
    this.typographies = document.querySelectorAll('[name="typography"]');
    
    this.init();
    this.listenCheckboxes();
    this.listenKanaChanges();
    this.listenTypographies();
  }

  init() {
    chrome.storage.local.get(null, items => {
      const { hiragana, katakana, romajiKana, furigana, displayTranslation, includeMaru, includeTenten, typography } = items;
      this.hiragana.checked = !!hiragana;
      this.katakana.checked = !!katakana;
      this.romajiKana.checked = !!romajiKana;
      this.displayTranslation.checked = !!displayTranslation;
      this.furigana.checked = !!furigana;
      this.includeMaru.checked = !!includeMaru;
      this.includeTenten.checked = !!includeTenten;
      if(typography) {
        document.querySelector(`input[type="radio"][value="${typography}"]`).checked = true;
      } else {
        document.getElementById('typography_system').checked = true;
      }
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

  listenTypographies() {
    for(let i=0; i < this.typographies.length; i++){
      this.typographies[i].addEventListener('change', (e) => {
        const value = e.target.value
        this.saveKey('typography', value);
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