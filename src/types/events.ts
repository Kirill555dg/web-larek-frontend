import { Order } from './order';

// Хорошая практика даже простые типы выносить в алиасы
// Зато когда захотите поменять это достаточно сделать в одном месте

export type EventName = string | RegExp;
// eslint-disable-next-line @typescript-eslint/ban-types
export type Subscriber = Function;
export type EmitterEvent = {
	eventName: string;
	data: unknown;
};

export interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
}

// События приложения (формат "объект:действие")
export type AppEvent =
	| { type: 'product:click'; data: { id: string } } // Клик по товару
	| { type: 'cart:add'; data: { id: string } } // Добавление в корзину
	| { type: 'cart:remove'; data: { id: string } } // Удаление из корзины
	| { type: 'order:submit'; data: Order } // Отправка заказа
	| { type: 'modal:open'; data: { type: 'product' | 'cart' | 'order' } } // Открытие модалки
	| { type: 'error'; data: { message: string } }; // Ошибка
