import Input from './Input';

export default class Form {
  constructor() {
    this.element = document.createElement('form');
    this.element.setAttribute('autocomplete', 'off');

    this.errorMsg = document.createElement('div');
    this.errorMsg.classList.add('error');

    this.inputName = new Input('Название', 'name').create();

    this.inputUrl = new Input('Ссылка на изображение', 'url').create();
    this.inputUrl.append(this.errorMsg);

    this.button = document.createElement('button');
    this.button.textContent = 'Добавить';

    this.inputOnFocus = this.inputOnFocus.bind(this);
    this.element.addEventListener('focus', this.inputOnFocus, true);

    this.element.append(this.inputName, this.inputUrl, this.button);
  }

  inputOnFocus() {
    this.element.querySelector('.error').textContent = '';
  }
}
