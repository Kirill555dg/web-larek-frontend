import OrderApi from '../api/OrderApi';
import { EventEmitter } from '../core/events/EventEmitter';
import { Order } from '../types';

export default class OrderModel {
	constructor(private api: OrderApi, private emitter: EventEmitter) {}

	async submitOrder(order: Order): Promise<void> {
		try {
			// TODO: Добавить валидацию данных
			const result = await this.api.submitOrder(order);
			this.emitter.emit('order:success', result);
		} catch (error) {
			// TODO: Типизировать ошибки
			this.emitter.emit('order:error', error);
		}
	}

	// TODO: Добавить методы валидации полей
}
