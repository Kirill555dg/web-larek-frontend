import Component from '../core/Component';
import { Product } from '../../types';
import { EventEmitter } from '../core/EventEmitter';

/**
 * Представление списка товаров на главной странице
 */
export default class ProductListView extends Component<Product[]> {
	private eventEmitter: EventEmitter;

	/**
	 * Конструктор класса
	 * @param container Родительский элемент списка товаров
	 * @param eventEmitter Глобальный эмиттер событий
	 */
	constructor(container: HTMLElement, eventEmitter: EventEmitter) {
		super(container);
		this.eventEmitter = eventEmitter;
	}

	/**
	 * Рендерит список товаров
	 * @param products Список товаров для отображения
	 */
	render(products: Product[]): HTMLElement {
		this.container.innerHTML = ''; // Очищаем контейнер перед обновлением

		products.forEach((product) => {
			const productElement = this.createProductElement(product);
			this.container.appendChild(productElement);
		});

		return this.container;
	}

	/**
	 * Создаёт HTML-элемент для карточки товара
	 * @param product Данные товара
	 * @returns HTMLElement
	 */
	private createProductElement(product: Product): HTMLElement {
		const element = document.createElement('div');
		element.classList.add('product-card');
		element.dataset.productId = String(product.id);

		element.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">${product.price} ₽</p>
      `;

		element.addEventListener('click', () => {
			this.eventEmitter.emit('product:click', product);
		});

		return element;
	}
}
