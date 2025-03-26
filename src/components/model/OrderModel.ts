import { Order, IEvents, PaymentMethod } from '../../types';
import { Model } from '../core/Model';
import CartModel from './CartModel';

export default class OrderModel extends Model<Record<string, unknown>> {
	private cart: CartModel;
	private order: Order;

	constructor(cart: CartModel, events: IEvents) {
		super({}, events);
		this.cart = cart;
		this.order = this.createEmptyOrder();
	}

	/**
	 * Создаёт пустой заказ.
	 */
	private createEmptyOrder(): Order {
		return {
			payment: null,
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	/**
	 * Обновляет способ оплаты.
	 */
	setPaymentMethod(payment: PaymentMethod): void {
		this.order.payment = payment;
		this.emitChanges('order:update', { field: 'payment', value: payment });
	}

	/**
	 * Обновляет адрес доставки.
	 */
	setAddress(address: string): void {
		this.order.address = address.trim();
		this.emitChanges('order:update', { field: 'address', value: address });
	}

	/**
	 * Обновляет email.
	 */
	setEmail(email: string): void {
		this.order.email = email.trim();
		this.emitChanges('order:update', { field: 'email', value: email });
	}

	/**
	 * Обновляет телефон.
	 */
	setPhone(phone: string): void {
		this.order.phone = phone.trim();
		this.emitChanges('order:update', { field: 'phone', value: phone });
	}

	/**
	 * Обновляет список товаров из корзины и вычисляет сумму.
	 */
	updateItems(): void {
		const cartItems = this.cart.getItems();
		this.order.items = cartItems.map((item) => item.id);
		this.order.total = cartItems.reduce(
			(sum, item) => sum + (item.price ?? 0),
			0
		);

		this.emitChanges('order:update', {
			field: 'items',
			value: this.order.items,
		});
		this.emitChanges('order:update', {
			field: 'total',
			value: this.order.total,
		});
	}

	/**
	 * Проверяет, заполнены ли все обязательные поля.
	 */
	isOrderValid(): boolean {
		const { payment, address, email, phone, items } = this.order;
		return !!payment && !!address && !!email && !!phone && items.length > 0;
	}

	/**
	 * Подтверждает заказ, если все поля заполнены.
	 */
	confirmOrder(): void {
		if (!this.isOrderValid()) {
			this.emitChanges('order:submit-error', {
				message: 'Не все поля заполнены',
			});
			return;
		}

		this.emitChanges('order:submit', { order: this.order });

		// Очистка данных после успешного оформления
		this.cart.clearCart();
		this.order = this.createEmptyOrder();
	}
}
