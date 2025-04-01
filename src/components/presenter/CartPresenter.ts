import { IEvents, Product } from "../../types";
import CartModel from "../model/CartModel";
import CartModalView from "../view/CartModalView";
import PageLayout from "../view/PageLayout";

export default class CartPresenter {
  constructor(
    private modalView: CartModalView,
    private layout: PageLayout,
    private model: CartModel,
    private events: IEvents
  ) {
    this.initialize();
  }

  private initialize() {
    // Обновление интерфейса при изменениях
    this.events.on('cart:update', () => this.updateCartState());

    // Обработка открытия корзины
    this.events.on('cart:open', () => this.openCart());

    // Удаление товаров
    this.events.on('cart:remove', (product: Product) => {
      this.model.removeFromCart(product.id);
      this.events.emit('cart:update');
    });

    this.events.on('cart:submit', () => {
      this.handleCheckout();
    });

    this.events.on('cart:clear', () => {
      this.model.clearCart();
      this.layout.counter = 0;
    });

    // Инициализация состояния
    this.updateCartState();
  }

  private updateCartState() {
    const items = this.model.getItems();

    // Обновление модалки и счетчика
    this.modalView.render(items);
    this.layout.counter = items.length;
  }

  private openCart() {
    const content = this.modalView.render(this.model.getItems())
    this.events.emit('modal:open', { content: content });
  }

  // Для интеграции с OrderPresenter
  public handleCheckout() {
    if (!this.model.isEmpty()) {
      this.events.emit('order:start', {
        items: this.model.getItems(),
        total: this.calculateTotal()
      });
    }
  }

  private calculateTotal(): number {
    return this.model.getItems().reduce(
      (sum, item) => sum + (item.price ?? 0),
      0
    );
  }
}
