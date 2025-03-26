import Component from '../core/Component';
import { PaymentMethod } from '../../types';

export default class OrderFormView extends Component {
	constructor(container: HTMLElement) {
		super(container);
	}

	render(): HTMLElement {
		// TODO: Реализовать форму выбора способа оплаты
		// TODO: Добавить валидацию поля адреса
		// TODO: Интегрировать карту для выбора адреса
		return this.container;
	}

	// TODO: Реализовать переключение способов оплаты
	setPayment(method: PaymentMethod): void {}
}
