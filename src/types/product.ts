export type ProductCategory =
	| 'софт-скил'
	| 'хард-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка';

export interface Product {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ProductCategory;
	price: number | null; // null для "бесценного" товара
}
