
import { Expose } from 'class-transformer';
import {
    BaseEntity,
    Column,
    Entity,
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

	@ManyToOne(() => CustomerEntity, (customer) => customer.id)
	customer: CustomerEntity;

	@Column({ type: 'int' })
	customer_id: string | number;

	constructor(size: Partial<KeyTokenEntity>) {
		super();
		if (size) {
			Object.assign(this, size);
		}
	}
}
