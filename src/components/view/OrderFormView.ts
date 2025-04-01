import { IEvents } from "../../types";
import { OrderInfo } from "../../types/order";
import { ensureElement } from "../../utils/utils";
import { Form } from "./common/Form";


export class OrderFormView extends Form<OrderInfo> {
  protected _buttons: HTMLButtonElement[];
  protected _address: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

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
