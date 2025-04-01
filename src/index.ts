import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { LarekApi } from './components/LarekApi';
import { EventEmitter } from './components/core/EventEmitter';
import CartModel from './components/model/CartModel';
import OrderModel from './components/model/OrderModel';
import ProductModel from './components/model/ProductModel';
import CartPresenter from './components/presenter/CartPresenter';
import ModalPresenter from './components/presenter/ModalPresenter';
import OrderPresenter from './components/presenter/OrderPresenter';
import ProductPresenter from './components/presenter/ProductPresenter';
import CartModalView from './components/view/CartModalView';
import ContactsFormView from './components/view/ContactsFormView';
import OrderFormView from './components/view/OrderFormView';
import OrderResponseView from './components/view/OrderResponseView';
import PageLayout from './components/view/PageLayout';
import ProductListView from './components/view/ProductListView';
import ProductModalView from './components/view/ProductModalView';
import Modal from './components/view/common/Modal';
import { ensureElement, cloneTemplate } from './utils/utils';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// Для отладки: логирование всех событий
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
});

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

// ======================
// Получение DOM-элементов
// ======================

// Основные контейнеры
const pageContainer = ensureElement<HTMLElement>('.page');
const galleryContainer = ensureElement<HTMLElement>('.gallery');
const modalContainer = ensureElement<HTMLElement>('#modal-container');

// Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// ======================
// Инициализация компонентов
// ======================

// Модели данных
const productModel = new ProductModel(api, events);
const cartModel = new CartModel(productModel, events);
const orderModel = new OrderModel(events);

// UI компоненты
const pageLayout = new PageLayout(pageContainer, events);

const productListView = new ProductListView(
  galleryContainer,
  events
);

const productModalView = new ProductModalView(
  cloneTemplate(cardPreviewTemplate),
  events
);

const cartModalView = new CartModalView(
  cloneTemplate(basketTemplate),
  events
);

const orderFormView = new OrderFormView(
  cloneTemplate(orderTemplate),
  events
);

const contactsFormView = new ContactsFormView(
  cloneTemplate(contactsTemplate),
  events
);

const orderResponseView = new OrderResponseView(
  cloneTemplate(successTemplate),
  events
);

const mainModal = new Modal(modalContainer, events);

// ======================
// Инициализация презентеров
// ======================

new ProductPresenter(
  productListView,
  productModalView,
  productModel,
  cartModel,
  events
);

new CartPresenter(
  cartModalView,
  pageLayout,
  cartModel,
  events
);

new OrderPresenter(
  orderFormView,
  contactsFormView,
  orderResponseView,
  orderModel,
  api,
  events
);

new ModalPresenter(
  mainModal,
  pageLayout,
  events
);
