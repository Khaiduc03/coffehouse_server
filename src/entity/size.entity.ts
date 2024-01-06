import { ISize } from 'src/interface';
import { Base } from './base-entity';
import { Column, Entity } from 'typeorm';
@Entity({ name: 'size' })
export class SizeEntity extends Base implements ISize {
	@Column({ type: 'varchar', length: 256 })
	size_name: string;

	@Column({ type: 'float' })
	price: number;

	constructor(size: Partial<SizeEntity>) {
		super();
		if (size) {
			Object.assign(this, size);
		}
	}
}
