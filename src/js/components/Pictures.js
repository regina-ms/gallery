export default class Pictures {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('pictures-list');

    this.imgOnLoad = this.imgOnLoad.bind(this);
    this.imgOnError = this.imgOnError.bind(this);

    this.onBtnCloseClick = this.onBtnCloseClick.bind(this);
  }

  onBtnCloseClick(e) {
    const itemToDelete = e.target.closest('.image-item');
    itemToDelete.remove();
    this.image = null;
  }

  imgOnLoad() {
    this.createPicture();
  }

  imgOnError() {
    this.image = null;
    document.querySelector('.error').textContent = 'неверный url';
  }

  checkImageSrc(src, title) {
    this.image = document.createElement('img');

    if (title) {
      this.image.setAttribute('title', title);
      this.image.setAttribute('alt', title);
    }

    this.image.addEventListener('load', this.imgOnLoad);
    this.image.addEventListener('error', this.imgOnError);
    this.image.src = src;
  }

  createPicture() {
    const div = document.createElement('div');
    div.classList.add('image-item');

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', this.onBtnCloseClick);

    div.append(closeBtn, this.image);

    this.element.append(div);
  }
}
