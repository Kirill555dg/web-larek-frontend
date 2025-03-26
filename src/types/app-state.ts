import { Product } from './product';
import { Order } from './order';

// Состояние приложения
export interface AppState {
	catalog: Product[]; // Все товары
	basket: string[]; // IDs товаров в корзине
	order: Partial<Order>; // Данные заказа (адрес, оплата, контакты)
	previewProductId: string | null; // ID товара, открытого в модалке
	error: string | null; // Текст ошибки
}

// Ошибки валидации форм
export type FormErrors<T> = Partial<Record<keyof T, string>>;
