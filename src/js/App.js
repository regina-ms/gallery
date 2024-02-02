import Form from './components/Form';
import Pictures from './components/Pictures';

export default class App {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.element = document.createElement('div');
    this.element.classList.add('app');

    this.form = new Form();
    this.pictures = new Pictures();

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.form.element.addEventListener('submit', this.onFormSubmit);
  }

  onFormSubmit(e) {
    e.preventDefault();

    if (!e.target.url.value) {
      this.form.element.querySelector('.error').textContent = 'введите url';
      return;
    }

    this.pictures.checkImageSrc(e.target.url.value, e.target.name.value);
    this.form.element.reset();
  }

  init() {
    this.element.append(this.form.element, this.pictures.element);
    this.parentElement.append(this.element);
  }
}
