import Component from '../core/Component';
import { Product } from '../../types';

export default class ProductListView extends Component<Product[]> {
    constructor(container: HTMLElement) {
        super(container);
    }

    render(products: Product[]): HTMLElement {
        // TODO: Реализовать рендеринг списка товаров
        // TODO: Добавить обработку клика на карточку товара
        // TODO: Реализовать пагинацию/бесконечный скролл
        return this.container;
    }
}
