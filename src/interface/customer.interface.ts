export interface ICustomer {
	id: number | string;

	first_name: string | null;

	last_name: string | null;

	full_name: string | null;

	phone_number: string | null;

	email: string | null;

	avatar: string | null;

	password_hash: string;
}

export interface ICustomerAddress {
	id: number | string;

	customer_id: number | string;

	address_line1: string;

	address_line2: string;

	city: string;

	country: string;

	phone_number: string;
}

export interface IVoucher {
	id: number | string;

	voucher_name: string;

	voucher_code: string;

	discount: number;

	start_date: number;

	end_date: number;

	active: boolean;

	point: number;
}
