import { IEvents } from "../../types";
import { OrderSuccessResponse } from "../../types/order";
import { ensureElement } from "../../utils/utils";
import Component from "../core/Component";


export default class OrderResponseView extends Component<OrderSuccessResponse> {
  private closeButton: HTMLButtonElement;
  private descriptionElement: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents
  ) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);

    this.closeButton.addEventListener('click', () => {
      this.events.emit('modal:close');
    });
  }

  render(data: OrderSuccessResponse): HTMLElement {
    this.setText(this.descriptionElement, `Списано ${data.total} синапсов`);
    return this.container;
  }
}
