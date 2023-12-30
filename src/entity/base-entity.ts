import {  Column, PrimaryGeneratedColumn } from 'typeorm';
export class Base   {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	created_at: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: string;

	@Column({ type: 'timestamp', default: null })
	deleted_at: string;

	
}
