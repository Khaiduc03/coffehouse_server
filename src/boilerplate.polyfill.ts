import { FindOneOptions, ObjectId } from 'typeorm';

declare module 'typeorm' {
	interface Repository<Entity> {
		findOneCustom(
			id: string | number | Date | ObjectId,
			options?: FindOneOptions<Entity>,
		): Promise<Entity | undefined>;
	}
}
