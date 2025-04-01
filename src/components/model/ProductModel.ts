import { Product, IEvents } from '../../types';
import { Model } from '../core/Model';
import { LarekApi } from '../LarekApi';


export default class ProductModel extends Model<Record<string, unknown>> {
  private api: LarekApi;
  private products: Map<string, Product> = new Map();

  constructor(api: LarekApi, events: IEvents) {
    super({}, events);
    this.api = api;
  }

  /**
   * Загружает список товаров и создаёт их экземпляры.
   */
  async loadProducts(): Promise<void> {
    try {
      const productList = await this.api.getProductList();
      this.products.clear();

      productList.forEach((product) => {
        this.products.set(product.id, product);
      });

      this.emitChanges('product:list', {
        products: Array.from(this.products.values()),
      });
    } catch (e) {
      console.error(e)
      this.emitChanges('product:error', {
        message: 'Ошибка загрузки товаров',
      });
    }
  }

  /**
   * Получает товар из кэша или запрашивает с сервера.
   */
  async loadProduct(id: string): Promise<void> {
    if (this.products.has(id)) {
      this.emitChanges('product:item', { product: this.products.get(id) });
      return;
    }

    try {
      const product = await this.api.getProductItem(id);
      if (product) {
        this.products.set(id, product);
        this.emitChanges('product:item', { product });
      } else {
        this.emitChanges('product:error', { message: 'Товар не найден' });
      }
    } catch {
      this.emitChanges('product:error', {
        message: 'Ошибка загрузки товара',
      });
    }
  }

  /**
   * Получает список всех товаров.
   */
  getAll(): Product[] {
    return Array.from(this.products.values());
  }

  /**
   * Ищет товар по ID.
   */
  getById(id: string): Product | undefined {
    return this.products.get(id);
  }
}
