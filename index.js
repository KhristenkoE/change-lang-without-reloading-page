const titlesBlock = document.querySelector('#titles');
const selectElement = document.querySelector('#language');

const DEFAULT_LANGUAGE = 'ru'; // всегда нужен какой-то дефолт, на случай если основные данные не придут или будут неверны
const titles = Object.keys(data); // возвращает все ключи обьекта в виде массива http://old.code.mu/javascript/object/Object.keys.html
const supportedLanguages = ['en', 'ru', 'ua'];

function getLanguage () {
  /* .slice(1) убирает первый символ из строки, нам это нужно, потому что {window.location.hash} возвращает хэш в формате: #{наш хэш}, а нам # не нужен */
  const formattedLanguageFromHash = window.location.hash.slice(1);
  return supportedLanguages.includes(formattedLanguageFromHash) ? formattedLanguageFromHash : DEFAULT_LANGUAGE;
};

// проходимся по массиву {supportedLanguages} и добавляем каждый язык в {selectElement}
function renderOptions (selectedLanguage) {
  selectElement.textContent = '';

  supportedLanguages.forEach(function (language) { // forEach проходится по каждому елементу массива и кладет его в переданную функцию

    /*
      Для создания и запихивания html-элементов можно также юзать такой способ: selectElement.innerHTML += '<option>бла бла</option>'
      Но .innerHTML более медленный, т.к полность перезаписывает контент блока к которому применяется, когда .appendChild лишь добавляет элемент в конец.
    */
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

selectElement.addEventListener('change', function () {  // когда меняем в селекте язык - меняем хэш в url, чтобы была синхронизация данных в приложении
  window.location.hash = selectElement.value;

  renderOptions(selectElement.value);
});

window.addEventListener('hashchange', function () { // когда хэш url меняется перерерисовываем загаловки в правильном языке и элементы селекта
  const language = getLanguage();

  renderTitles(data, language);
  renderOptions(language);
});

function init () { // инициализация. Вызывается лишь один раз, ниже, лишь после того, как весь html загрузится
  const language = getLanguage();

  renderOptions(language);
  renderTitles(data, language);
};

document.addEventListener('DOMContentLoaded', init); // https://learn.javascript.ru/onload-ondomcontentloaded
