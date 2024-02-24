import Form from './components/Form';
import Pictures from './components/Pictures';

export default class App {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  init() {
    this.element = document.createElement('div');
    this.element.classList.add('app');

    this.form = new Form('form');
    this.pictures = new Pictures();

    this.element.append(this.form.init(), this.pictures.init());
    this.parentElement.append(this.element);
  }
}
