import { Product, IEvents } from "../../types";
import CartModel from "../model/CartModel";
import ProductModel from "../model/ProductModel";
import ProductListView from "../view/ProductListView";
import ProductModalView from "../view/ProductModalView";


export default class ProductPresenter {
  private currentProduct: Product | null = null;

  constructor(
    private listView: ProductListView,
    private modalView: ProductModalView,
    private productModel: ProductModel,
    private cartModel: CartModel,
    private events: IEvents
  ) {
    this.initialize();
  }

  private initialize() {
    // Подписка на события
    this.events.on('product:list', ({ products }: { products: Product[] }) => {
      this.listView.render(products);
    });

    this.events.on('product:select', (product: Product) => {
      this.handleProductSelect(product);
    });

    this.events.on('product:add', (product: Product) => {
      this.handleAddToCart(product);
    });

    this.events.on('cart:update', () => {
      this.updateButtonState();
    });

    // Загрузка товаров
    this.productModel.loadProducts();
  }

  private handleProductSelect(product: Product) {
    this.currentProduct = product;
    const content = this.modalView.render(product);
    this.events.emit('modal:open', { content: content });
    this.updateButtonState();
  }

  private handleAddToCart(product: Product) {
    try {
      if (product.price === null) {
        throw new Error('Нельзя добавить товар без цены');
      }

      if (this.cartModel.isInCart(product.id)) {
        throw new Error('Товар уже в корзине');
      }

      this.cartModel.addToCart(product.id);
      this.events.emit('cart:update');
    } catch (error) {
      console.error(error);
    }
  }

  private updateButtonState() {
    if (!this.currentProduct) return;

    const inCart = this.cartModel.isInCart(this.currentProduct.id);
    const isPriceless = this.currentProduct.price === null;

    this.modalView.updateButtonState(
      inCart ? 'Уже в корзине' : 'В корзину',
      inCart || isPriceless
    );
  }
}
