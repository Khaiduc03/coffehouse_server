import { ICustomerAddress } from 'src/interface/customer.interface';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base-entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'customer_address' })
export class CustomerAddressEntity extends Base implements ICustomerAddress {
	@Column({ type: 'int' })
	customer_id: string | number;

	@ManyToOne(() => CustomerEntity, (customer) => customer.addresses)
	@JoinColumn({
		name: 'customer_id',
		referencedColumnName: 'id',
		foreignKeyConstraintName: 'fk_customer_address_customer_id',
	})
	customer: CustomerEntity;

	@Column({ type: 'varchar', nullable: true })
	address_line1: string;

	@Column({ type: 'varchar', nullable: true })
	address_line2: string;

	@Column({ type: 'varchar', nullable: true })
	city: string;

	@Column({ type: 'varchar', nullable: true })
	country: string;

	@Column({ type: 'varchar', nullable: true })
	phone_number: string;

	constructor(customerAddress: Partial<CustomerAddressEntity>) {
		super();
		if (customerAddress) {
			Object.assign(this, customerAddress);
		}
	}
}
