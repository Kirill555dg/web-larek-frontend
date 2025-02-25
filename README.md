# Проектная работа "Веб-ларек"

Интернет-магазин товаров для веб-разработчиков с каталогом, корзиной и оформлением заказа

Стек: TypeScript, HTML, SCSS, Webpack
Архитектура: MVP (Model-View-Presenter)
API: REST (работа с товарами и заказами)

## Структура проекта:

```bash
src/
├── core/
│   ├── Component.ts          # Базовый класс для UI-компонентов
│   └── events/
│       ├── EventEmitter.ts   # Реализация брокера событий
│       └── types.ts          # Интерфейсы и типы событий (IEvents, EventName)
├── model/
│   ├── CartModel.ts          # Логика корзины (добавление/удаление товаров)
│   ├── OrderModel.ts         # Валидация и оформление заказов
│   └── ProductModel.ts       # Управление каталогом товаров
├── presenter/
│   ├── CartPresenter.ts      # Обработка событий корзины
│   ├── OrderPresenter.ts     # Логика оформления заказа
│   └── ProductPresenter.ts   # Управление взаимодействием с каталогом
├── types/
│   ├── app-state.ts          # Состояние приложения (AppState)
│   ├── errors.ts             # Типы ошибок (ApiError, ValidationMessage)
│   ├── events.ts             # Типы событий (AppEvent)
│   ├── index.ts              # Реэкспорт всех типов
│   ├── order.ts              # Типы заказов (Order, OrderResult)
│   └── product.ts            # Типы товаров (Product, ProductCategory)
└── view/
    ├── CartModalView.ts      # Модальное окно корзины
    ├── ContactsFormView.ts   # Форма контактов
    ├── OrderFormView.ts      # Форма заказа
    ├── PageLayout.ts         # Базовый макет страницы
    ├── ProductListView.ts    # Список товаров
    └── ProductModalView.ts   # Модальное окно товара
```

### Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

---

## Ключевые компоненты

### 1. Модели (Model)

- **ProductModel**: Загружает товары через `ProductApi.getProducts()`, кэширует данные. События: `products:loaded`, `product:error`.
- **CartModel**: Управляет корзиной (добавление/удаление), сохраняет состояние в LocalStorage. События: `cart:update`.
- **OrderModel**: Валидирует адрес и контакты, отправляет заказ через `OrderApi.submitOrder()`. События: `order:success`, `order:error`.

### 2. Представления (View)

- **ProductListView**: Рендерит список товаров с фильтрацией по категориям. Обрабатывает клики по карточкам (`product:click`).
- **CartModalView**: Отображает товары в корзине, общую сумму, кнопку оформления. Обновляется при событии `cart:update`.
- **OrderFormView**: Двухэтапная форма: выбор оплаты/адреса → ввод контактов. Валидирует поля в реальном времени.

### 3. Презентеры (Presenter)

- **ProductPresenter**: Обрабатывает события каталога (клики по товарам, обновление списка).
- **CartPresenter**: Управляет корзиной (добавление/удаление товаров, обновление интерфейса).
- **OrderPresenter**: Валидирует и отправляет заказы, обрабатывает ошибки.

---

## Типы данных

- **Product**: Описывает товар (id, title, price, category, image).
- **Order**: Описывает заказ (payment, address, email, phone, items).
- **OrderResult**: Ответ API (успешный заказ или ошибка).
- **AppEvent**: События приложения (product:click, cart:add, order:submit, error).

---

## События

Формат "объект:действие":

- `product:click` — Выбор товара (передаётся Product).
- `cart:add` — Добавление в корзину (передаётся productId).
- `order:submit` — Отправка заказа (передаётся Order).
- `error` — Ошибка (передаётся сообщение).

---

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```
