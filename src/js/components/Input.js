export default class Input {
  constructor(label, nameAttr) {
    this.element = document.createElement('input');
    this.element.setAttribute('name', nameAttr);
    this.labelText = label;
    this.labelClass = nameAttr;
  }

  create() {
    const labelEl = document.createElement('label');
    labelEl.classList.add(this.labelClass);
    labelEl.append(this.labelText, this.element);
    return labelEl;
  }
}
