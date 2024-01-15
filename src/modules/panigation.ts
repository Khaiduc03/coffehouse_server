import { Metadata } from 'src/types/common.type';

export class Panigation<T> {
	private items: T[];
	private metadata: Metadata;
	constructor(items: T[], total_item: number, page: number, take: number) {
		this.metadata = {
			current_page: page,
			total_page: Math.ceil(total_item / take),
			total_item: total_item,
			take: take,
			can_next: page < Math.ceil(total_item / take),
			can_previous: page > 1,
		};
		this.items = items;
	}
}
