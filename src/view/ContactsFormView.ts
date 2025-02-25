import Component from '../core/Component';

export default class ContactsFormView extends Component {
	constructor(container: HTMLElement) {
		super(container);
	}

	render(): HTMLElement {
		// TODO: Реализовать поля ввода email и телефона
		// TODO: Добавить маски для ввода телефона
		// TODO: Реализовать проверку формата email
		return this.container;
	}

	// TODO: Добавить показ ошибок валидации
	showErrors(errors: string[]): void {}
}
