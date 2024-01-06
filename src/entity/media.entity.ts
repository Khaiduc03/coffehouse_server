import { IMedia, MediaType } from 'src/interface/media.interface';
import { Base } from './base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'media' })
export class MediaEntity extends Base implements IMedia {
	@Column({ type: 'varchar', length: 256 })
	name: string;

	@Column({ type: 'int' })
	product_id: string | number;

	@ManyToOne(() => ProductEntity, (product) => product.id, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({
		name: 'product_id',
		referencedColumnName: 'id',
		foreignKeyConstraintName: 'fk_media_product_id',
	})
	product: ProductEntity;

	@Column({ type: 'varchar', length: 256 })
	path: string;

	@Column({ type: 'enum', enum: MediaType, default: MediaType.IMAGE })
	type: MediaType;

	@Column({ type: 'boolean', default: false })
	is_thumbnail: boolean;

	constructor(media: Partial<MediaEntity>) {
		super();
		if (media) {
			Object.assign(this, media);
		}
	}
}
