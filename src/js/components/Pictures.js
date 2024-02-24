export default class Pictures {
  constructor() {
    this.imgOnLoad = this.imgOnLoad.bind(this);
    this.imgOnError = this.imgOnError.bind(this);

    this.onBtnCloseClick = this.onBtnCloseClick.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onFormEnter = this.onFormEnter.bind(this);
  }

  init() {
    this.element = document.createElement('div');
    this.element.classList.add('pictures-list');

    this.createInputFile();
    this.element.append(this.inputFileContainer);
    document.addEventListener('formSubmit', this.onFormEnter);
    return this.element;
  }

  onFormEnter(e) {
    const imageTitle = e.target.imageTitle.value;
    const imageUrl = e.target.imageUrl.value;
    this.checkImageSrc(imageUrl, imageTitle);
  }

  onFileInputChange(e) {
    const files = [...e.target.files];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev) => {
        this.checkImageSrc(ev.target.result, file.name);
      };
    });

    e.target.value = '';
  }

  createInputFile() {
    this.inputFileContainer = document.createElement('div');
    this.inputFileContainer.classList.add('input-file-container');

    this.inputFile = document.createElement('input');
    this.inputFile.setAttribute('type', 'file');
    this.inputFile.setAttribute('name', 'image');
    this.inputFile.setAttribute('accept', 'image/*');
    this.inputFile.multiple = true;
    this.inputFile.addEventListener('change', this.onFileInputChange);

    this.inputFile.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.target.classList.add('dragover');
      this.overlay.textContent = '+';
    });

    this.inputFile.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.target.classList.remove('dragover');
      this.overlay.textContent = 'нажмите или перетащите картинки сюда';
    });

    this.inputFile.addEventListener('drop', (e) => {
      e.target.classList.remove('dragover');
      this.overlay.textContent = 'нажмите или перетащите картинки сюда';
    });

    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    this.overlay.textContent = 'нажмите или перетащите картинки сюда';

    this.inputFileContainer.append(this.inputFile);
    this.inputFileContainer.append(this.overlay);
  }

  onBtnCloseClick(e) {
    const itemToDelete = e.target.closest('.image-item');
    itemToDelete.remove();
    this.imageEl = null;
  }

  imgOnLoad(e) {
    this.createPicture(e.target);
  }

  imgOnError() {
    this.createPicture('Невозможно загрузить изображение');
  }

  checkImageSrc(src, title) {
    const imageEl = document.createElement('img');

    if (title) {
      imageEl.setAttribute('title', title);
      imageEl.setAttribute('alt', title);
    }

    imageEl.src = src;
    imageEl.addEventListener('load', this.imgOnLoad);
    imageEl.addEventListener('error', this.imgOnError);
  }

  createPicture(el) {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image-item');

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', this.onBtnCloseClick);

    imgContainer.append(closeBtn, el);

    this.inputFileContainer.after(imgContainer);
  }
}
