import { IToping } from 'src/interface';
import { Base } from './base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'toping' })
export class TopingEntity extends Base implements IToping {
	@Column({ type: 'varchar', length: 256 })
	toping_name: string;

	@Column({ type: 'float' })
	price: number;

	@Column({ type: 'varchar', nullable: true })
	image_thumbnail: string;

	constructor(toping: Partial<TopingEntity>) {
		super();
		if (toping) {
			Object.assign(this, toping);
		}
	}
}
