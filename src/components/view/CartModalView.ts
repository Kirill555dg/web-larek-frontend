import { Product, IEvents } from "../../types";
import Component from "../core/Component";


export default class CartModalView extends Component<Product[]> {
  private list: HTMLUListElement;
  private total: HTMLElement;
  private submitButton: HTMLButtonElement;
  private itemTemplate: HTMLTemplateElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.list = container.querySelector('.basket__list')!;
    this.total = container.querySelector('.basket__price')!;
    this.submitButton = container.querySelector('.basket__button')!;
    this.itemTemplate = document.getElementById('card-basket') as HTMLTemplateElement;

    this.submitButton.addEventListener('click', () => {
      this.events.emit('cart:submit');
    });
  }

  render(products: Product[]): HTMLElement {
    this.list.innerHTML = '';

    products.forEach((product, index) => {
      const item = this.createCartItem(product, index);
      this.list.appendChild(item);
    });

    this.updateTotal(products);
    this.updateSubmitState(products);

    return this.container;
  }

  private createCartItem(product: Product, index: number): HTMLElement {
    const clone = this.itemTemplate.content.cloneNode(true) as HTMLElement;
    const item = clone.querySelector('.basket__item') as HTMLElement;
    const title = clone.querySelector('.card__title')!;
    const price = clone.querySelector('.card__price')!;
    const indexEl = clone.querySelector('.basket__item-index')!;
    const deleteBtn = clone.querySelector('.basket__item-delete')!;

    title.textContent = product.title;
    price.textContent = `${product.price} синапсов`;
    indexEl.textContent = (index + 1).toString();

    deleteBtn.addEventListener('click', () => {
      this.events.emit('cart:remove', product);
    });

    return item;
  }

  private updateTotal(products: Product[]) {
    const sum = products.reduce((acc, item) => acc + item.price, 0);
    this.total.textContent = `${sum} синапсов`;
  }

  private updateSubmitState(products: Product[]) {
    this.submitButton.disabled = products.length === 0;
  }
}
