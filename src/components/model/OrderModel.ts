import {
	Order,
	IEvents,
	PaymentMethod,
	Contacts,
	FormErrors,
} from '../../types';
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

	public reset() {
		this.order = this.createEmptyOrder();
	}
	public setPaymentMethod(payment: PaymentMethod): void {
		this.order.payment = payment;
		this.emitChanges('order:update', { field: 'payment', value: payment });
	}

	public setAddress(address: string): void {
		this.order.address = address.trim();
		this.emitChanges('order:update', { field: 'address', value: address });
	}

	public setEmail(email: string): void {
		this.order.email = email.trim();
		this.emitChanges('order:update', { field: 'email', value: email });
	}
	public setPhone(phone: string): void {
		this.order.phone = phone.trim();
		this.emitChanges('order:update', { field: 'phone', value: phone });
	}

	public updateItems(): void {
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

	public isOrderValid(): boolean {
		const { payment, address, email, phone, items } = this.order;
		return !!payment && !!address && !!email && !!phone && items.length > 0;
	}

	public confirmOrder(): void {
		if (!this.isOrderValid()) {
			this.emitChanges('order:error', {
				message: 'Не все поля заполнены',
			});
			return;
		}

		this.emitChanges('order:submit', { order: this.order });
	}

	public validateOrderStep(): FormErrors<Order> {
		return {
			payment: !this.order.payment ? 'Выберите способ оплаты' : undefined,
			address: !this.order.address ? 'Укажите адрес' : undefined,
		};
	}

	public validateContactsStep(): FormErrors<Order> {
		return {
			email: !this.order.email ? 'Введите email' : undefined,
			phone: !this.order.phone ? 'Введите телефон' : undefined,
		};
	}

	public isOrderStepValid(): boolean {
		return Object.values(this.validateOrderStep()).every((v) => !v);
	}

	public isContactsStepValid(): boolean {
		return Object.values(this.validateContactsStep()).every((v) => !v);
	}

	public getOrderData(): Order {
		return { ...this.order };
	}

	public getContactsData(): Contacts {
		return {
			email: this.order.email,
			phone: this.order.phone,
		};
	}
}
