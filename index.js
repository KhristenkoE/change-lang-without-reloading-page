const titlesBlock = document.querySelector('#titles');
const selectElement = document.querySelector('#language');

const DEFAULT_LANGUAGE = 'ru';
const titles = Object.keys(data); // возвращает все ключи обьекта в виде массива http://old.code.mu/javascript/object/Object.keys.html
const supportedLanguages = ['en', 'ru', 'ua'];

function getLanguage () {
  const formattedLanguageFromHash = window.location.hash.slice(1); // .slice(1) убирает первый символ из строки
  return supportedLanguages.includes(formattedLanguageFromHash) ? formattedLanguageFromHash : DEFAULT_LANGUAGE;
};

function renderOptions (selectedLanguage) { // проходимся по массиву {supportedLanguages} и добавляем каждый язык в {selectElement}
  selectElement.textContent = '';

  supportedLanguages.forEach(function (language) { // forEach проходится по каждому елементу массива и кладет его в переданную функцию 
    const optionElement = document.createElement('option');
    const isSelected = language === selectedLanguage;
  
    optionElement.textContent = language;

    if (isSelected) {
      optionElement.setAttribute('selected', true);
    }

    selectElement.appendChild(optionElement);
  });
}

function renderTitles (data, language) { // проходимся по обьекту {data} и добавляем заголовки в правильном языке в {titlesBlock}
  titlesBlock.textContent = '';

  Object.values(data).forEach(function (value) {
    const titleElement = document.createElement('h3');

    titleElement.textContent = value[language];
    titlesBlock.appendChild(titleElement);
  });
};

selectElement.addEventListener('change', function () {  // когда меняем в селекте язык - меняем хэш в url
  window.location.hash = selectElement.value;

  renderOptions(selectElement.value);
});

window.addEventListener('hashchange', function () { // когда хэш url меняется перерерисовываем загаловки в правильном языке
  const language = getLanguage();

  renderTitles(data, language);
  renderOptions(language);
});

function init () { // инициализация всего, вызывается лишь один раз, ниже, лишь после того, как весь html загрузится
  const language = getLanguage();

  renderOptions(language);
  renderTitles(data, language);
};

document.addEventListener('DOMContentLoaded', init); // https://learn.javascript.ru/onload-ondomcontentloaded
