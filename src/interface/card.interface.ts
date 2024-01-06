export interface ICard {
	customer_id: number | string;
}

export interface ICardItem {
	card_id: number | string;
	product_id: number | string;
	quantity: number;
}
