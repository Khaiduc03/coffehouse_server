import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base-entity';
import { IStore } from 'src/interface/store.interface';
import { OrderEntity } from './order.entity';

@Entity({ name: 'store' })
export class StoreEntity extends Base implements IStore {
	@Column({ type: 'varchar', length: 256 })
	store_name: string;

	@Column({ type: 'varchar' })
	address: string;

	@Column({ type: 'varchar', default: '0123456789' })
	phone: string;

	@Column({ type: 'varchar', default: 'coffeehouse@gmail.com' })
	email: string;

	@Column({ type: 'varchar', nullable: true })
	image_thumbnail: string;

	@OneToMany(() => OrderEntity, (product) => product.store_id)
	orders: OrderEntity[];

	constructor(store: Partial<StoreEntity>) {
		super();
		if (store) {
			Object.assign(this, store);
		}
	}
}
