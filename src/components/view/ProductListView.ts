import { Product, IEvents } from "../../types";
import Component from "../core/Component";


export default class ProductListView extends Component<Product[]> {
  private readonly template: HTMLTemplateElement;

  constructor(container: HTMLElement, private events: IEvents) {
    super(container);

    this.template = document.getElementById('card-catalog') as HTMLTemplateElement;
  }

  /**
   * Отображает список товаров в галерее
   * @param products Список товаров
   */
  render(products: Product[]): HTMLElement {
    this.container.innerHTML = '';

    products.forEach((product) => {
      const card = this.createProductCard(product);
      this.container.appendChild(card);
    });

    return this.container;
  }

  /**
   * Создаёт карточку товара на основе шаблона
   * @param product Данные о товаре
   * @returns Готовый элемент карточки
   */
  private createProductCard(product: Product): HTMLElement {
    const card = this.template.content.cloneNode(true) as HTMLElement;
    const cardElement = card.querySelector('.gallery__item') as HTMLElement;
    const title = card.querySelector('.card__title') as HTMLElement;
    const category = card.querySelector('.card__category') as HTMLElement;
    const image = card.querySelector('.card__image') as HTMLImageElement;
    const price = card.querySelector('.card__price') as HTMLElement;

    title.textContent = product.title;
    category.textContent = product.category;
    image.src = product.image;
    image.alt = product.title;
    price.textContent = product.price !== null ? `${product.price} синапсов` : 'Бесценно';

    cardElement.addEventListener('click', () => {
      this.events.emit('product:select', product);
    });

    return cardElement;
  }
}
