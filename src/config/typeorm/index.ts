import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'src/snake-naming.strategy';
@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		return {
			type: 'postgres',

			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			namingStrategy: new SnakeNamingStrategy(),
			subscribers: [],
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			migrations: ['/database/migrations/*{.ts,.js}'],
		};
	}
}
