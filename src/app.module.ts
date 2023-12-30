import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				PORT: Joi.number().default(3000),
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test')
					.default('development'),
			}),
			validationOptions: {
				abortEarly: false,
			},
			envFilePath: '.env',
			isGlobal: true,
		}),
	],
})
export class AppModule {}
