import Component from '../core/Component';

export class PageLayout extends Component {
	constructor(container: HTMLElement) {
		super(container);
	}

	render(): HTMLElement {
		// TODO: Реализовать хедер с корзиной и поиском
		// TODO: Добавить футер с контактами
		// TODO: Сделать адаптивную верстку
		return this.container;
	}

	// TODO: Реализовать переключение активного раздела
	setActiveSection(section: string): void {}
}
