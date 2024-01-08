import { IProduct } from 'src/interface';
import { Base } from './base-entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CategoriesEntity } from './categories.entity';
import { TopingEntity } from './toping.entity';
import { SizeEntity } from './size.entity';

@Entity({ name: 'product' })
export class ProductEntity extends Base implements IProduct {
	@Column({ type: 'varchar', length: 256 })
	product_name: string;

	@Column({ type: 'text', nullable: true, default: 'Information still update' })
	description: string;

	@Column({ type: 'float' })
	regular_price: number;

	@ManyToMany(() => CategoriesEntity, (category) => category.id)
	@JoinTable({
		name: 'product_categories',
		joinColumn: {
			name: 'categories_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'product_id',
			referencedColumnName: 'id',
		},
	})
	categories: CategoriesEntity[];

	@ManyToMany(() => TopingEntity, (topings) => topings.id)
	@JoinTable({
		name: 'product_topings',
		joinColumn: {
			name: 'product_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'toping_id',
			referencedColumnName: 'id',
		},
	})
	topings: CategoriesEntity[];

	@ManyToMany(() => SizeEntity, (size) => size.id)
	@JoinTable({
		name: 'categories_size',
		joinColumn: {
			name: 'categories_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'size_id',
			referencedColumnName: 'id',
		},
	})
	sizes: SizeEntity[];

	constructor(product: Partial<ProductEntity>) {
		super();
		if (product) {
			Object.assign(this, product);
		}
	}
}
