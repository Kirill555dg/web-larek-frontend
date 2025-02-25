import { IEvents } from '../core/events/types';
import OrderModel from '../model/OrderModel';
import OrderFormView from '../view/OrderFormView';

export default class OrderPresenter {
	constructor(
		private model: OrderModel,
		private view: OrderFormView,
		private emitter: IEvents
	) {
		// TODO: Подписаться на события оформления заказа
		// TODO: Подписаться на изменения формы
	}

	private handleOrderSubmit() {
		// TODO: Валидировать и отправить заказ
	}

	private handleFormChange() {
		// TODO: Обновить состояние модели при изменении формы
	}
}
