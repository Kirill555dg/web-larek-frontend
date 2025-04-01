import { IEvents } from "../../types";
import { ensureElement } from "../../utils/utils";
import Component from "../core/Component";


interface IPageState {
  counter: number;
  locked: boolean;
}

export default class PageLayout extends Component<IPageState> {
  protected _counter: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
    this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);

    // Обработка клика по корзине
    this._basketButton.addEventListener('click', () => {
      events.emit('cart:open');
    });

    // Блокировка скролла при открытии модалок
    events.on('modal:open', () => this.locked = true);
    events.on('modal:close', () => this.locked = false);
  }

  // Обновление счётчика корзины
  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  // Блокировка прокрутки страницы
  set locked(value: boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
  }
}
