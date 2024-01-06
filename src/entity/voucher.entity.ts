import { IVoucher } from 'src/interface/customer.interface';
import { Base } from './base-entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'voucher' })
export class VoucherEntity extends Base implements IVoucher {
	@Column({ type: 'varchar', length: 256 })
	voucher_name: string;

	@Column({ type: 'varchar', length: 10 })
	voucher_code: string;

	@Column({ type: 'float' })
	discount: number;

	@Column({ type: 'bigint' })
	start_date: number;

	@Column({ type: 'bigint' })
	end_date: number;

	@Column({ type: 'boolean' })
	active: boolean;

	@Column({ type: 'int' })
	point: number;

	@ManyToMany(() => CustomerEntity, (customer) => customer.vouchers)
	@JoinTable({
		name: 'customer_voucher',
		joinColumn: { name: 'customer_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'voucher_id', referencedColumnName: 'id' },
	})
	customers: CustomerEntity[];

	constructor(voucher: Partial<VoucherEntity>) {
		super();
		if (voucher) {
			Object.assign(this, voucher);
		}
	}
}
