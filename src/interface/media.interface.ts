export enum MediaType {
	IMAGE = 'image',
	VIDEO = 'video',
}

export interface IMedia {
	id: number | string;

	product_id: number | string;

	name: string;

	path: string;

	type: MediaType;

	is_thumbnail: boolean;
}
