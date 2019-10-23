document.querySelector('#go-to-options').addEventListener('click', () => {
  chrome.tabs.create({
    url: chrome.extension.getURL('src/options/index.html')
  });
});

[...document.querySelectorAll('[data-i18n]')].map(e => {
  const i18nKey = e.getAttribute('data-i18n')
  e.innerHTML = chrome.i18n.getMessage(i18nKey)
})

chrome.storage.local.get(null, items => {
  const { displayRomaji, furigana, displayTranslation } = items;
  const main = document.getElementsByTagName('main')[0]
  if(!displayRomaji) { main.classList.add('hide-romaji') }
  if(!furigana) { main.classList.add('hide-furigana') }
  if(!displayTranslation) { main.classList.add('hide-translation') }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (const key in changes) {
    const { newValue } = changes[key];
    const element = document.getElementById(key)
    if(key === 'romajiKana') {
      newValue ? element.classList.remove('hidden') : element.classList.add('hidden')
    }
    if(key === 'furigana') {
      const main = document.getElementsByTagName('main')[0]
      newValue ? main.classList.remove('hide-furigana') : main.classList.add('hide-furigana')
    }
    if(key === 'displayRomaji') {
      const main = document.getElementsByTagName('main')[0]
      newValue ? main.classList.remove('hide-romaji') : main.classList.add('hide-romaji')
    }
    if(key === 'displayTranslation') {
      const main = document.getElementsByTagName('main')[0]
      newValue ? main.classList.remove('hide-translation') : main.classList.add('hide-translation')
    }
  }
});