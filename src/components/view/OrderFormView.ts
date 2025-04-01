import { IEvents, OrderInfo } from "../../types";
import { ensureElement } from "../../utils/utils";
import Form from "./common/Form";


export default class OrderFormView extends Form<OrderInfo> {
  protected _buttons: HTMLButtonElement[];
  protected _address: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.events.on('order:success', () => {
      this._buttons.forEach(btn => btn.classList.remove('button_alt-active'));
      this.address = '';
    })

    this._buttons = Array.from(this.container.querySelectorAll('.order__buttons .button'));
    this._address = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this._buttons.forEach(button => {
      button.addEventListener('click', () => {
        const payment = button.name === 'card' ? 'online' : 'offline';
        this._buttons.forEach(btn => btn.classList.remove('button_alt-active'));
        button.classList.add('button_alt-active');
        this.onInputChange('payment', payment);
      });
    });
  }

  set address(value: string) {
    this._address.value = value;
  }
}
