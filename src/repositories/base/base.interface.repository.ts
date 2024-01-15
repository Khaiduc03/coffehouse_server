import { FindAllResponse } from 'src/types/common.type';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseRepositoryInterface<T> {
	createEntity(dto: T | any, relations?: string[]): Promise<T>;

	getEntityById(
		id: string,
		relation?: string,
		throwsException?: boolean,
	): Promise<T>;

	findOneByCondition(condition?: object, projection?: string): Promise<T>;

	getAllEntity(
		relations: string[],
		throwsException?: boolean,
	): Promise<FindAllResponse<T>>;

	updateEntity(
		id: string,
		dto: QueryDeepPartialEntity<T>,
		relations?: string[],
	): Promise<T>;

	softDelete(id: string): Promise<boolean>;

	permanentlyDelete(id: string): Promise<boolean>;
}
