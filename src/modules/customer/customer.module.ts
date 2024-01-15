import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressEntity, CustomerEntity } from 'src/entity';
import { CustomerRepository } from 'src/repositories/customer.repository';

@Module({
	imports: [TypeOrmModule.forFeature([CustomerEntity, CustomerAddressEntity])],
	providers: [
		CustomerService,
		{
			provide: 'CustomerRepositoryInterface',
			useClass: CustomerRepository,
		},
	],
	controllers: [CustomerController],
	exports: [
		CustomerService,
		{
			provide: 'CustomerRepositoryInterface',
			useClass: CustomerRepository,
		},
	],
})
export class CustomerModule {}
