export interface IOrder {
	customer_id: number | string;
	order_date: Date;
	order_status: string;
	shipping_status: string;
	payment_status: string;
	shipping_address: string;
	store_loaction: string;
	notes: string;
}

export interface IOrderItem {
	order_id: number | string;
	product_id: number | string;
	quantity: number;
	price: number;
	voucher_id: number | string;
	toping_id: number | string;
	size_id: number | string;
}
