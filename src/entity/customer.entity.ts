import { ICustomer } from 'src/interface/customer.interface';
import { Base } from './base-entity';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	VirtualColumn,
} from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CustomerAddressEntity } from './customer_address.entity';
import { VoucherEntity } from './voucher.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'customer' })
export class CustomerEntity extends Base implements ICustomer {
	@Column({ type: 'varchar', length: 50, nullable: true })
	first_name: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	last_name: string;

	@VirtualColumn({
		query: (alias) =>
			`SELECT CONCAT(${alias}.first_name, ' ', ${alias}.last_name)`,
	})
	full_name: string;

	@Column({ type: 'varchar', nullable: true })
	avatar: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	phone_number: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	email: string;

	@Column({ type: 'varchar' })
	password_hash: string;

	@OneToMany(() => CustomerAddressEntity, (address) => address.customer_id)
	addresses: CustomerAddressEntity[];

	@ManyToMany(() => VoucherEntity, (voucher) => voucher.id)
	@JoinTable({
		name: 'customer_voucher',
		joinColumn: { name: 'customer_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'voucher_id', referencedColumnName: 'id' },
	})
	vouchers: VoucherEntity[];

	@OneToMany(() => OrderEntity, (orders) => orders.customer_id)
	orders: OrderEntity[];

	constructor(customer: Partial<CustomerEntity>) {
		super();
		if (customer) {
			Object.assign(
				this,
				plainToClass(CustomerEntity, customer, {
					excludeExtraneousValues: true,
					excludePrefixes: ['password_hash'],
				}),
			);
		}
	}
}
