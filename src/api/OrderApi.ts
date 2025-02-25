import { Order, OrderResult } from '../types';
import Api from './Api';

export class OrderApi extends Api {
	constructor(baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
	}

	async submitOrder(order: Order): Promise<OrderResult> {
		// TODO: Добавить обработку ошибок валидации
		return this.post('/order', order) as Promise<OrderResult>;
	}
}
