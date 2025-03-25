import { IEvents, Product } from "../../types";
import { Model } from "../core/Model";
import ProductModel from "./ProductModel";


export default class CartModel extends Model<Product[]> {
  private products: ProductModel;
  private cartItems: string[] = []; // Хранит ID товаров в порядке добавления

  constructor(products: ProductModel, events: IEvents) {
    super([], events);
    this.products = products;
  }

  /**
   * Добавляет товар в корзину, если его там нет.
   */
  addToCart(productId: string): void {
    const product = this.products.getById(productId);
    if (!product) {
      this.emitChanges("cart:add-error", { message: "Товар не найден" });
      return;
    }

    if (product.price === null) {
      this.emitChanges("cart:add-error", { message: "Нельзя добавить товар без цены" });
      return;
    }

    if (!this.cartItems.includes(productId)) {
      this.cartItems.push(productId);
      this.emitChanges("cart:add", { id: productId, items: this.getItems() });
    }
  }

  /**
   * Удаляет товар из корзины.
   */
  removeFromCart(productId: string): void {
    const index = this.cartItems.indexOf(productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.emitChanges("cart:remove", { id: productId, items: this.getItems() });
    }
  }

  /**
   * Очищает корзину.
   */
  clearCart(): void {
    this.cartItems = [];
    this.emitChanges("cart:clear", { items: [] });
  }

  /**
   * Возвращает список товаров в корзине в порядке добавления.
   */
  getItems(): Product[] {
    return this.cartItems.map((id) => this.products.getById(id)).filter(Boolean) as Product[];
  }

  /**
   * Проверяет, находится ли товар в корзине.
   */
  isInCart(productId: string): boolean {
    return this.cartItems.includes(productId);
  }
}
