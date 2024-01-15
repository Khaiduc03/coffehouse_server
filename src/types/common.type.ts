export enum SORT_TYPE {
	'DESC' = 'desc',
	'ASC' = 'acs',
}

export class ModelEntity {
	id: number | string;
	[key: string]: any;
}

export type Metadata = {
	current_page: number;
	total_page: number;
	total_item: number;
	take: number;
	can_next: boolean;
	can_previous: boolean;
};

export type FindAllResponse<T> = {
	metadata: Metadata;
	items: T[];
};

export type PaginateOptions = {
	page: number;
	relations?: string[];
	take?: number;
};

export type SortOptions = { sort_by: string; sort_type: SORT_TYPE };

export type SearchParams = { keywork: string; field: string };

export type PaginateParams = { offset: number; limit: number };

export enum RegisterType {
	EMAIL = 'email',
	PHONE_NUMBER = 'phone_number',
}
