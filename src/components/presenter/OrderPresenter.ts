import { IEvents, PaymentMethod } from '../../types';
import { LarekApi } from '../LarekApi';
import OrderModel from '../model/OrderModel';

export default class OrderPresenter {
	constructor(
		private model: OrderModel,
		private api: LarekApi,
		private events: IEvents
	) {
		this.initialize();
	}

	private initialize() {
		// Обработка изменений полей заказа
		this.events.on('order.payment:change', (data: { value: PaymentMethod }) => {
			this.model.setPaymentMethod(data.value);
			this.updateOrderValidity();
		});

		this.events.on('order.address:change', (data: { value: string }) => {
			this.model.setAddress(data.value);
			this.updateOrderValidity();
		});

		// Обработка изменений контактных данных
		this.events.on('contacts.email:change', (data: { value: string }) => {
			this.model.setEmail(data.value);
			this.updateContactsValidity();
		});

		this.events.on('contacts.phone:change', (data: { value: string }) => {
			this.model.setPhone(data.value);
			this.updateContactsValidity();
		});

		// Обработка отправки форм
		this.events.on('order:submit', () => this.handleOrderSubmit());
		this.events.on('contacts:submit', () => this.handleContactsSubmit());

		// Инициализация заказа
		this.events.on('order:start', () => {
			this.events.emit('order:render', this.model.getOrderData());
		});
	}

	private updateOrderValidity() {
		const errors = this.model.validateOrderStep();
		const isValid = Object.values(errors).every((v) => !v);

		this.events.emit('order:validity', {
			valid: isValid,
			errors: Object.values(errors).filter(Boolean).join('; '),
		});
	}

	private updateContactsValidity() {
		const errors = this.model.validateContactsStep();
		const isValid = Object.values(errors).every((v) => !v);

		this.events.emit('contacts:validity', {
			valid: isValid,
			errors: Object.values(errors).filter(Boolean).join('; '),
		});
	}

	private async handleOrderSubmit() {
		if (this.model.isOrderStepValid()) {
			this.events.emit('modal:switch', { type: 'contacts' });
			this.events.emit('contacts:render', this.model.getContactsData());
		}
	}

	private async handleContactsSubmit() {
		try {
			if (!this.model.isOrderValid()) {
				throw new Error('Заполните все обязательные поля');
			}

			const result = await this.api.createOrder(this.model.getOrderData());

			if (result.success) {
				this.events.emit('cart:clear');
				this.events.emit('order:success', { result });
				this.model.reset();
				this.events.emit('modal:switch', { type: 'success' });
			}
		} catch (error) {
			this.events.emit('form:error', {
				form: 'contacts',
				message: error.message,
			});
		}
	}
}
