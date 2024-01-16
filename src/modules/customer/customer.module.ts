import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CustomerAddressEntity,
	CustomerEntity,
	KeyTokenEntity,
} from 'src/entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

import { CustomerRepository } from 'src/repositories/customer.repository';
import { KeyTokenRepository } from 'src/repositories/key-toke.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			CustomerEntity,
			CustomerAddressEntity,
			KeyTokenEntity,
		]),
	],
	providers: [
		CustomerService,
		{
			provide: 'CustomerRepositoryInterface',
			useClass: CustomerRepository,
		},

		{
			provide: 'KeyTokenRepositoryInterface',
			useClass: KeyTokenRepository,
		},
	],
	controllers: [CustomerController],
	exports: [
		CustomerService,
		{
			provide: 'CustomerRepositoryInterface',
			useClass: CustomerRepository,
		},

		{
			provide: 'KeyTokenRepositoryInterface',
			useClass: KeyTokenRepository,
		},
	],
})
export class CustomerModule {}
