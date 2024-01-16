import { plainToClass } from 'class-transformer';
import { ICustomer } from 'src/interface/customer.interface';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	VirtualColumn,
} from 'typeorm';
import { Base } from './base-entity';
import { CustomerAddressEntity } from './customer_address.entity';
import { OrderEntity } from './order.entity';
import { VoucherEntity } from './voucher.entity';

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

	@Column({
		type: 'varchar',
		nullable: true,
		default:
			'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg',
	})
	avatar: string;

	@Column({ type: 'varchar', length: 50, nullable: true, unique: true })
	phone_number: string;

	@Column({ type: 'varchar', length: 100, nullable: true, unique: true })
	email: string;

	@Column({ type: 'varchar', unique: true })
	password: string;

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
