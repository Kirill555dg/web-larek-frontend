import { IEvents } from '../../types';
import CartModel from '../model/CartModel';
import CartModalView from '../view/CartModalView';

export default class CartPresenter {
  constructor(
    private model: CartModel,
    private view: CartModalView,
    private emitter: IEvents
  ) {
    // TODO: Подписаться на события добавления/удаления товаров
    // TODO: Подписаться на открытие корзины
  }

  private handleCartUpdate() {
    // TODO: Обновить представление корзины
  }

  private handleCartOpen() {
    // TODO: Показать модальное окно корзины
  }
}
