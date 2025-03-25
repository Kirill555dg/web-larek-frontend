import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { LarekApi } from './components/LarekApi';
import { EventEmitter } from './components/core/EventEmitter';
import { Order } from './types';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// // Тестируем получение списка товаров
// api.getProductList()
//   .then(products => console.log("Product List:", products))
//   .catch(error => console.error("Error fetching product list:", error));

// // Тестируем получение конкретного товара (замени `someProductId` на реальный ID)
// const someProductId = "854cef69-976d-4c2a-a18c-2aa45046c390";
// api.getProductItem(someProductId)
//   .then(product => console.log("Product Item:", product))
//   .catch(error => console.error("Error fetching product item:", error));

// // Тестируем отправку заказа (замени данные на актуальные)
// const testOrder: Order = {
//   payment: "online",
//   email: "test@test.ru",
//   phone: "+71234567890",
//   address: "Spb Vosstania 1",
//   total: 2200,
//   items: [
//     "854cef69-976d-4c2a-a18c-2aa45046c390",
//     "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
//   ]
// };

// api.createOrder(testOrder)
//   .then(orderResult => console.log("Order Result:", orderResult))
//   .catch(error => console.error("Error creating order:", error));

