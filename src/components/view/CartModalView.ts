import Component from '../core/Component';

export default class CartModalView extends Component<string[]> {
	constructor(container: HTMLElement) {
		super(container);
	}

	render(items: string[]): HTMLElement {
		// TODO: Отобразить список товаров в корзине
		// TODO: Рассчитать и показать итоговую сумму
		// TODO: Добавить кнопки "Оформить заказ" и "Закрыть"
		return this.container;
	}

	// TODO: Реализовать анимацию открытия/закрытия
}
