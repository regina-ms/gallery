export default class Form {
  constructor(id) {
    this.id = id;

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.inputOnFocus = this.inputOnFocus.bind(this);
  }

  inputOnFocus(e) {
    e.target.nextElementSibling.remove();
    e.target.removeEventListener('focus', this.inputOnFocus);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const isImageTitle = e.target.imageTitle.validity.valid;
    const isImageUrl = e.target.imageUrl.validity.valid;

    if (!isImageTitle) {
      this.showError(e.target.imageTitle);
      return;
    }

    if (!isImageUrl) {
      this.showError(e.target.imageUrl);
      return;
    }

    e.target.dispatchEvent(
      new Event('formSubmit', { bubbles: true }),
    );

    this.element.reset();
  }

  showError(el) {
    this.error.textContent = 'Заполните поле';
    el.after(this.error);
    el.addEventListener('focus', this.inputOnFocus);
  }

  init() {
    this.element = document.createElement('form');
    this.element.setAttribute('id', this.id);
    this.element.setAttribute('autocomplete', 'off');
    this.element.noValidate = true;

    this.titleLabel = document.createElement('label');
    this.titleLabel.textContent = 'Название';

    this.inputTitle = document.createElement('input');
    this.inputTitle.setAttribute('name', 'imageTitle');
    this.inputTitle.required = true;
    this.titleLabel.append(this.inputTitle);

    this.urlLabel = document.createElement('label');
    this.urlLabel.textContent = 'Url картинки';

    this.inputUrl = document.createElement('input');
    this.inputUrl.setAttribute('name', 'imageUrl');
    this.inputUrl.required = true;
    this.urlLabel.append(this.inputUrl);

    this.button = document.createElement('button');
    this.button.textContent = 'Добавить';
    this.button.setAttribute('type', 'submit');

    this.error = document.createElement('div');
    this.error.classList.add('error');

    this.element.addEventListener('submit', this.onFormSubmit);
    this.element.append(this.titleLabel, this.urlLabel, this.button);

    return this.element;
  }
}
