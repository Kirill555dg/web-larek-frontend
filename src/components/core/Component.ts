/**
 * Базовый класс для UI-компонентов
 *
 * @template T - Тип данных компонента (по умолчанию object)
 */
export default abstract class Component<T extends object = object> {
	/**
	 * @param container - Родительский DOM-элемент (всегда HTMLElement)
	 */
	protected constructor(protected readonly container: HTMLElement) {}

	// ====================================================
	// Базовые методы для работы с DOM
	// ====================================================

	/**
	 * Переключает CSS-класс на элементе
	 * @param element Целевой элемент
	 * @param className Имя класса
	 * @param force Принудительное добавление/удаление класса
	 */
	protected toggleClass(
		element: HTMLElement,
		className: string,
		force?: boolean
	): void {
		element.classList.toggle(className, force);
	}

	/**
	 * Устанавливает текстовое содержимое элемента
	 * @param element Целевой элемент
	 * @param value Значение для установки
	 */
	protected setText(element: HTMLElement, value: unknown): void {
		if (element) {
			element.textContent = String(value);
		}
	}

	/**
	 * Управляет состоянием блокировки элемента
	 * @param element Целевой элемент
	 * @param state Состояние блокировки
	 */
	protected setDisabled(element: HTMLElement, state: boolean): void {
		if (element) {
			state
				? element.setAttribute('disabled', '')
				: element.removeAttribute('disabled');
		}
	}

	/**
	 * Скрывает элемент через display: none
	 * @param element Целевой элемент
	 */
	protected setHidden(element: HTMLElement): void {
		element.style.display = 'none';
	}

	/**
	 * Показывает элемент (сбрасывает inline стиль display)
	 * @param element Целевой элемент
	 */
	protected setVisible(element: HTMLElement): void {
		element.style.removeProperty('display');
	}

	/**
	 * Устанавливает изображение с альтернативным текстом
	 * @param element HTMLImageElement
	 * @param src URL изображения
	 * @param alt Альтернативный текст
	 */
	protected setImage(
		element: HTMLImageElement,
		src: string,
		alt?: string
	): void {
		if (element) {
			element.src = src;
			if (alt) element.alt = alt;
		}
	}

	// ====================================================
	// Основной метод рендеринга компонента
	// ====================================================

	/**
	 * Обновляет состояние компонента и возвращает корневой элемент
	 * @param data Данные для обновления компонента
	 * @returns HTMLElement
	 */
	render(data?: Partial<T>): HTMLElement {
		if (data) {
			Object.assign(this, data);
		}
		return this.container;
	}
}
