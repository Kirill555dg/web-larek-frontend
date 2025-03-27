import { IEvents } from "../../types";
import { ensureElement } from "../../utils/utils";
import Component from "../core/Component";

interface IModalData {
  content: HTMLElement | null;
}

export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);

    this._closeButton.addEventListener('click', this.close.bind(this));

    // Закрываем по клику на фон (оверлей), но не на содержимое
    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
  }

  set content(value: HTMLElement | null) {
    if (value) {
      this._content.replaceChildren(value);
    } else {
      this._content.innerHTML = ''; // Очищаем содержимое
    }
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close() {
    this.container.classList.remove('modal_active');
    this.content = null; // Очищаем контент при закрытии
    this.events.emit('modal:close');
  }

  render(data: IModalData): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}
