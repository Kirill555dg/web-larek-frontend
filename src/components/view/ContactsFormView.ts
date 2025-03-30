import { IEvents } from "../../types";
import { Contacts } from "../../types/order";
import { ensureElement } from "../../utils/utils";
import { Form } from "../common/Form";


export class ContactsFormView extends Form<Contacts> {
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._email = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this._phone = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
  }

  set email(value: string) {
    this._email.value = value;
  }

  set phone(value: string) {
    this._phone.value = value;
  }
}
