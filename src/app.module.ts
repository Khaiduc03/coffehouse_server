import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { TypeOrmService } from './config/typeorm';
@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				PORT: Joi.number().default(3000),
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test')
					.default('development'),
				DB_TYPE: Joi.valid('postgres', 'mysql').default('postgres'),
			}),
			validationOptions: {
				abortEarly: false,
			},
			envFilePath: '.env',
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmService,
		}),
	],
})
export class AppModule {}
