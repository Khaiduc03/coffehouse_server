// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ClassTransformOptions, plainToClass } from 'class-transformer';
// import { DeepPartial, Repository } from 'typeorm';
// import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
// import { ModelEntity } from './model.serializer';

// @Injectable()
// export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {
// 	async getAllEntity(
// 		relations: string[] = [],
// 		throwsException = false,
// 	): Promise<K[] | null> {
// 		return await this.find({ relations }).then((entity) => {
// 			if (!entity && throwsException) {
// 				return Promise.reject(new NotFoundException('Model not found'));
// 			}

// 			return Promise.resolve(entity ? this.transformMany(entity) : null);
// 		});
// 	}

// 	async getEntityById(
// 		id: any,
// 		relations: string[] = [],
// 		throwsException = false,
// 	): Promise<K | null> {
// 		return await this.findOneCustom(id, {
// 			relations,
// 		}).then((entity) => {
// 			if (!entity && throwsException) {
// 				return Promise.reject(new NotFoundException('Model not found'));
// 			}

// 			return Promise.resolve(entity ? this.transform(entity) : null);
// 		});
// 	}

// 	async createEntity(
// 		dto: DeepPartial<T>,
// 		relations: string[] = [],
// 	): Promise<K> {
// 		return await this.save(dto)
// 			.then(async (dto) => {
// 				return await this.getEntityById((dto as any).id, relations);
// 			})
// 			.catch((error) => Promise.reject(error));
// 	}

// 	async updateEntity(
// 		id: string,
// 		dto: QueryDeepPartialEntity<T>,
// 		relations: string[] = [],
// 	): Promise<K> {
// 		return await this.update(id, dto)
// 			.then(async (entity) => {
// 				return await this.getEntityById((entity as any).id, relations);
// 			})
// 			.catch((error) => Promise.reject(error));
// 	}

// 	async deleteEntityById(id: number | string): Promise<boolean> {
// 		return await this.delete(id)
// 			.then(() => {
// 				return true;
// 			})
// 			.catch((error) => Promise.reject(error));
// 	}

// 	transform(model: T, transformOptions: ClassTransformOptions = {}): K {
// 		return plainToClass(ModelEntity, model, transformOptions) as K;
// 	}

// 	transformMany(model: T[], transformOptions: ClassTransformOptions = {}): K[] {
// 		return model.map((model) => this.transform(model, transformOptions));
// 	}
// }
