import { Injectable } from '@nestjs/common';
import { KeyTokenEntity } from 'src/entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class KeyTokenRepository extends Repository<KeyTokenEntity> {
	constructor(private dataSource: DataSource) {
		super(KeyTokenEntity, dataSource.createEntityManager());
	}

	async checkFieldExist(
		field: string,
		value: string | number,
	): Promise<string> {
		try {
			console.log(value);
			const keytoken = await this.findOne({
				where: { [field]: value },
			});

			return Promise.resolve(keytoken.public_key);
		} catch (error) {
			throw error;
		}
	}
}
