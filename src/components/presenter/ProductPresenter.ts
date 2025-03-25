import { IEvents } from '../core/events/types';
import ProductModel from '../model/ProductModel';
import ProductListView from '../view/ProductListView';

export default class ProductPresenter {
	constructor(
		private model: ProductModel,
		private view: ProductListView,
		private emitter: IEvents
	) {
		// TODO: Подписаться на события загрузки товаров
		// TODO: Подписаться на клики по товарам
	}

	private handleProductsLoaded() {
		// TODO: Обновить представление при загрузке данных
	}

	private handleProductClick() {
		// TODO: Обработать выбор товара
	}
}
