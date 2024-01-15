import { Expose } from 'class-transformer';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'key_token' })
export class KeyTokenEntity extends BaseEntity {
	@Expose()
	@PrimaryGeneratedColumn()
	id: number | string;

	@Column({ type: 'varchar' })
	public_key: string;

	@Column({ type: 'varchar' })
	curent_refresh_token: string;

	@ManyToOne(() => CustomerEntity, (customer) => customer.id)
	@JoinColumn({ name: 'customer_id' })
	customer_id: string | number;

	// @Column({ type: 'int' })
	// customer_id: string | number;

	constructor(size: Partial<KeyTokenEntity>) {
		super();
		if (size) {
			Object.assign(this, size);
		}
	}
}
