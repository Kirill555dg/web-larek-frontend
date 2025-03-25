import ProductApi from '../api/ProductApi';
import { EventEmitter } from '../core/EventEmitter';
import { Product } from '../../types';

export default class ProductModel {
    private _products: Product[] = [];

    constructor(private api: ProductApi, private emitter: EventEmitter) { }

    async loadProducts(): Promise<void> {
        try {
            const response = await this.api.getProducts();
            this._products = response.items;
            this.emitter.emit('products:loaded', this._products);
        } catch (error) {
            // TODO: Добавить обработку ошибок
            this.emitter.emit('error', error);
        }
    }

    get products(): Product[] {
        return this._products;
    }
}
