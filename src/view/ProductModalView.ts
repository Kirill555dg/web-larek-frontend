import Component from '../core/Component';
import { Product } from '../types';

export default class ProductModalView extends Component<Product> {
	constructor(container: HTMLElement) {
		super(container);
	}

	render(product: Product): HTMLElement {
		// TODO: Реализовать галерею изображений товара
		// TODO: Добавить кнопку "В корзину"
		// TODO: Отображать статус доступности товара
		return this.container;
	}

	// TODO: Реализовать закрытие модалки по клику вне области
}
