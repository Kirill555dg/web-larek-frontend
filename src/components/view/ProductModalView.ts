import { IEvents, Product } from "../../types";
import Component from "../core/Component";


export default class ProductModalView extends Component<Product> {
  private readonly template: HTMLTemplateElement;
  private _inCart: boolean = false;
  private button: HTMLButtonElement | null = null;

  constructor(container: HTMLElement, private events: IEvents) {
    super(container);
    this.template = document.getElementById('card-preview') as HTMLTemplateElement;
  }

  set InCart(value: boolean) {
    this._inCart = value;
  }

  get InCart(): boolean {
    return this._inCart;
  }

  render(product: Product): HTMLElement {
    const content = this.template.content.cloneNode(true) as HTMLElement;

    const category = content.querySelector('.card__category') as HTMLElement;
    const title = content.querySelector('.card__title') as HTMLElement;
    const image = content.querySelector('.card__image') as HTMLImageElement;
    const description = content.querySelector('.card__text') as HTMLElement;
    const price = content.querySelector('.card__price') as HTMLElement;
    this.button = content.querySelector('.card__button') as HTMLButtonElement;

    title.textContent = product.title;
    category.textContent = product.category;
    image.src = product.image;
    image.alt = product.title;
    description.textContent = product.description;
    price.textContent = product.price !== null ? `${product.price} синапсов` : 'Бесценно';

    this.button.textContent = this._inCart ? 'Уже в корзине' : 'В корзину';
    this.setDisabled(this.button, this._inCart);

    this.button.addEventListener('click', () => {
      this.events.emit('product:click', product);
    });

    this.container.innerHTML = '';
    this.container.appendChild(content);

    return this.container;
  }
}
