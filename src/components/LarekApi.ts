import Api from './core/Api';
import { ApiListResponse, Product, Order, OrderResult } from '../types';

export interface ILarekApi {
  getProductList: () => Promise<Product[]>;
  getProductItem: (id: string) => Promise<Product | null>;
  createOrder: (order: Order) => Promise<OrderResult>;
}

export class LarekApi extends Api implements ILarekApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  /**
   * Получает список товаров.
   * @returns Промис с массивом товаров.
   */
  getProductList(): Promise<Product[]> {
    return this.get('/product').then((data: ApiListResponse<Product>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image, // Добавляем полный путь к изображению
      }))
    );
  }

  /**
   * Получает информацию о конкретном товаре.
   * @param id - ID товара.
   * @returns Промис с товаром или `null`, если товар не найден.
   */
  getProductItem(id: string): Promise<Product | null> {
    return this.get(`/product/${id}`)
      .then((item: Product) => ({
        ...item,
        image: this.cdn + item.image,
      }))
      .catch((error: unknown): Promise<Product | null> => {
        if (typeof error === 'string' && error.includes('NotFound')) {
          return Promise.resolve(null);
        }
        return Promise.reject(error);
      });
  }

  /**
   * Создаёт заказ.
   * @param order - Данные заказа.
   * @returns Промис с результатом заказа.
   */
  createOrder(order: Order): Promise<OrderResult> {
    const result = this.post('/order', order) as Promise<OrderResult>;
    result
      .then((res) => res.success = true)
      .catch((res) => res.success = false)
    return result;
  }
}
