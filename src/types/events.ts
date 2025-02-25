import { Order } from "./order";

// События приложения (формат "объект:действие")
export type AppEvent =
  | { type: "product:click"; data: { id: string } } // Клик по товару
  | { type: "cart:add"; data: { id: string } } // Добавление в корзину
  | { type: "cart:remove"; data: { id: string } } // Удаление из корзины
  | { type: "order:submit"; data: Order } // Отправка заказа
  | { type: "modal:open"; data: { type: "product" | "cart" | "order" } } // Открытие модалки
  | { type: "error"; data: { message: string } }; // Ошибка