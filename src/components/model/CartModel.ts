import { IEvents, Product } from '../../types';
import { Model } from '../core/Model';
import ProductModel from './ProductModel';

export default class CartModel extends Model<Record<string, unknown>> {
  private products: ProductModel;
  private cartItems: string[] = []; // Хранит ID товаров в порядке добавления

  constructor(products: ProductModel, events: IEvents) {
    super({}, events);
    this.products = products;
  }

  addToCart(productId: string): void {
    const product = this.products.getById(productId);
    if (!product) {
      this.emitChanges('cart:error', { message: 'Товар не найден' });
      return;
    }

    if (product.price === null) {
      this.emitChanges('cart:error', {
        message: 'Нельзя добавить товар без цены',
      });
      return;
    }

    if (!this.cartItems.includes(productId)) {
      this.cartItems.push(productId);
      this.emitChanges('cart:update', {
        id: productId,
        items: this.getItems(),
      });
    }
  }

  removeFromCart(productId: string): void {
    const index = this.cartItems.indexOf(productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.emitChanges('cart:update', {
        id: productId,
        items: this.getItems(),
      });
    }
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getItems(): Product[] {
    return this.cartItems
      .map((id) => this.products.getById(id))
      .filter(Boolean) as Product[];
  }

  isInCart(productId: string): boolean {
    return this.cartItems.includes(productId);
  }

  isEmpty(): boolean {
    return this.cartItems.length === 0;
  }
}
