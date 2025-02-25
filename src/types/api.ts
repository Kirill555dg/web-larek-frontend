export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Стандартные ошибки API
export type ApiError =
	| 'Неверная сумма заказа'
	| 'Не указан адрес'
	| 'Товар не найден'
	| 'Ошибка сети';
