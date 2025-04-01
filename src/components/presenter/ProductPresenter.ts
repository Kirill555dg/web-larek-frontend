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
    // Загрузка начальных данных
    this.productModel.loadProducts();

    // Подписка на события модели
    this.events.on('product:list', (data: { products: Product[] }) => {
      this.listView.render(data.products);
    });

    // Обработка выбора товара
    this.events.on('product:select', (product: Product) => {
      this.currentProduct = product;
      this.modalView.render(product);
      this.events.emit('product:modal:open');
      this.updateButtonState();
    });

    // Обработка добавления в корзину
    this.events.on('product:add', (product: Product) => {
      if (this.validateProduct(product)) {
        this.cartModel.addToCart(product.id);
        this.events.emit('cart:update');
      }
    });

    // Реакция на изменения в корзине
    this.events.on('cart:update', () => {
      this.updateButtonState();
    });
  }

  private validateProduct(product: Product): boolean {
    if (!product.price) {
      this.events.emit('error', {
        message: 'Нельзя добавить товар без цены'
      });
      return false;
    }
    return true;
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

  public showProductDetails(productId: string) {
    const product = this.productModel.getById(productId);
    if (product) {
      this.events.emit('product:select', product);
    }
  }
}
