import { ApiListResponse, Product } from '../types';
import Api from './Api';

export default class ProductApi extends Api {
	constructor(baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
	}

	async getProducts(): Promise<ApiListResponse<Product>> {
		// TODO: Добавить параметры пагинации/фильтрации
		return this.get('/product') as Promise<ApiListResponse<Product>>;
	}
}
