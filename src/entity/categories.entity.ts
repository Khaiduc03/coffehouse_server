import { ICategories } from 'src/interface';
import { Column, JoinTable, ManyToMany } from 'typeorm';
import { Base } from './base-entity';
import { ProductEntity } from './product.entity';

export class CategoriesEntity extends Base implements ICategories {
	@Column({ type: 'varchar', length: 256 })
	categories_name: string;

	@Column({ type: 'varchar', length: 500, nullable: true })
	category_description: string;

	@Column({ type: 'varchar', nullable: true })
	icon: string;

	@Column({ type: 'varchar', nullable: true })
	active: boolean;

	@ManyToMany(() => ProductEntity, (product) => product.categories)
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
	products: ProductEntity[];

	constructor(categories: Partial<CategoriesEntity>) {
		super();
		if (categories) {
			Object.assign(this, categories);
		}
	}
}
