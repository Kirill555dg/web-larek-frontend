import { Product } from "../../types";
import Component from "../core/Component";


export default class ProductModalView extends Component<Product> {
  private readonly template: HTMLTemplateElement;
  private _inCart: boolean = false; // флаг, задаваемый извне

  constructor(container: HTMLElement) {
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
    const button = content.querySelector('.card__button') as HTMLButtonElement | null;

    category.textContent = product.category;
    title.textContent = product.title;
    image.src = product.image;
    image.alt = product.title;
    description.textContent = product.description;

    if (product.price !== null) {
      price.textContent = `${product.price} синапсов`;
    } else {
      price.textContent = 'Бесценно';
      if (button) {
        button.remove(); // товар не продаётся, скрываем кнопку
      }
    }

    // Если товар уже в корзине — дизейблим кнопку
    if (button && product.price !== null) {
      button.disabled = this._inCart;
    }

    this.container.replaceChildren(content);
    return this.container;
  }
}
