import { Expose } from 'class-transformer';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Base extends BaseEntity {
	@Expose()
	@PrimaryGeneratedColumn()
	id: number | string;

	@Expose()
	@Column({ type: 'bigint', default: new Date().getTime() })
	created_at: number;

	@Expose()
	@Column({ type: 'bigint', default: new Date().getTime() })
	updated_at: number;

	@Expose()
	@Column({ type: 'bigint', default: null })
	deleted_at: number;

	constructor() {
		super();
		this.created_at = new Date().getTime();
		this.updated_at = new Date().getTime();
		this.deleted_at = null;
	}
}
