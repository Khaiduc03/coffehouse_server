import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import typeorm from './config/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './modules/product/product.module';
@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				PORT: Joi.number().default(3000),
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test')
					.default('development'),
				DB_TYPE: Joi.valid('postgres').default('postgres'),
			}),
			validationOptions: {
				abortEarly: false,
			},
			envFilePath: '.env',
			isGlobal: true,
			load: [typeorm],
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) =>
				configService.get('typeorm'),
		}),
		AuthModule,
		CustomerModule,
		SharedModule,
		ProductModule,
	],
	providers: [],
})
export class AppModule {}
