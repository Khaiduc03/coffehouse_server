export interface IProduct {
	id: number | string;

	product_name: string;

	description: string | null;

	regular_price: number | null;
}

export interface IToping {
	toping_name: string;
	price: number;
	image_thumbnail: string;
}

export interface ISize {
	size_name: string;
	price: number;
}

export interface ICategories {
	categories_name: string;
	category_description: string;
	icon: string;
	active: boolean;
}
