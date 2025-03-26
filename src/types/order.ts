export type PaymentMethod = 'online' | 'offline';

export interface OrderInfo {
	payment: PaymentMethod;
	address: string;
	total: number;
}

export interface Contacts {
	email: string;
	phone: string;
}

export interface Order extends OrderInfo, Contacts {
	items: string[]; // IDs товаров
}

// Ответ API при успешном заказе
export interface OrderSuccessResponse {
	id: string;
	total: number;
}

// Ответ API при ошибке заказа
export interface OrderErrorResponse {
	error: string;
}

export type OrderResult =
	| ({ success: true } & OrderSuccessResponse)
	| ({ success: false } & OrderErrorResponse);
