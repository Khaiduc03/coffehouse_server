import { IVoucher } from 'src/interface/customer.interface';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Base } from './base-entity';
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
	customers: CustomerEntity[];

	constructor(voucher: Partial<VoucherEntity>) {
		super();
		if (voucher) {
			Object.assign(this, voucher);
		}
	}
}
