import { EventEmitter } from '../core/EventEmitter';

export default class CartModel {
    private _items: string[] = [];

    constructor(private emitter: EventEmitter) {
        // TODO: Восстановление из LocalStorage
    }

    addItem(productId: string): void {
        if (!this._items.includes(productId)) {
            this._items.push(productId);
            this.emitter.emit('cart:updated', this._items);
            // TODO: Сохранение в LocalStorage
        }
    }

    removeItem(productId: string): void {
        this._items = this._items.filter((id) => id !== productId);
        this.emitter.emit('cart:updated', this._items);
        // TODO: Обновление LocalStorage
    }

    get items(): string[] {
        return [...this._items];
    }

    // TODO: Добавить метод расчета суммы
}
