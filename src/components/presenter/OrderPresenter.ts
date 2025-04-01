import { IEvents, PaymentMethod, Product } from "../../types";
import { LarekApi } from "../LarekApi";
import OrderModel from "../model/OrderModel";
import ContactsFormView from "../view/ContactsFormView";
import OrderFormView from "../view/OrderFormView";
import OrderResponseView from "../view/OrderResponseView";

export default class OrderPresenter {
  constructor(
    private orderFormView: OrderFormView,
    private contactsFormView: ContactsFormView,
    private orderResponseView: OrderResponseView,
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

    this.events.on('order:validity', (data: { valid: boolean, errors: string[] }) => {
      this.orderFormView.valid = data.valid;
      this.orderFormView.errors = data.errors;
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


    this.events.on('contacts:validity', (data: { valid: boolean, errors: string[] }) => {
      this.contactsFormView.valid = data.valid;
      this.contactsFormView.errors = data.errors;
    });

    // Обработка отправки форм
    this.events.on('order:submit', () => this.handleOrderSubmit());
    this.events.on('contacts:submit', () => this.handleContactsSubmit());

    // Инициализация заказа
    this.events.on('order:start', (data: {
      items: Product[],
      total: number
    }) => this.handleOrderStart(data.items, data.total));
  }

  private handleOrderStart(items: Product[], total: number) {
    this.model.updateItems(items, total);
    const orderData = this.model.getOrderData();
    console.log(orderData)
    const orderContent = this.orderFormView.render({
      ...orderData,
      valid: false,
      errors: [],
    });
    this.updateOrderValidity();
    this.events.emit('modal:open', { content: orderContent });
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
      const contactsData = this.model.getContactsData();
      const contactsContent = this.contactsFormView.render({
        ...contactsData,
        valid: false,
        errors: [],
      });
      this.updateContactsValidity();
      this.events.emit('modal:open', { content: contactsContent });
    }
  }

  private async handleContactsSubmit() {
    try {
      if (!this.model.isOrderValid()) {
        throw new Error('Заполните все обязательные поля');
      }

      const result = await this.api.createOrder(this.model.getOrderData());
      console.log(result)
      if (result.success) {
        this.events.emit('cart:clear');
        this.events.emit('order:success', { result });
        this.model.reset();

        // Рендерим успешный ответ и передаем в модалку
        const successContent = this.orderResponseView.render(result);
        this.events.emit('modal:open', { content: successContent });
      }
    } catch (error) {
      this.events.emit('form:error', {
        form: 'contacts',
        message: error.message,
      });
    }
  }
}
