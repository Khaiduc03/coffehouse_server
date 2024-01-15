import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterType } from 'src/types/common.type';
import { CreateCustomerDto } from './dto/customer-register.dto';
import { CustomerRepositoryInterface } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
	constructor(
		@Inject('CustomerRepositoryInterface')
		private readonly customerRepository: CustomerRepositoryInterface,
	) {}

	async createCustomer(
		createCustomerDto: CreateCustomerDto,
		field: RegisterType,
	): Promise<any> {
		try {
			return await this.customerRepository.createCustomerWithField(
				createCustomerDto,
				field,
			);
		} catch (error) {
			throw new BadRequestException(
				`Failed to create customer with ${field}. Reason: ${error.message}`,
			);
		}
	}

	// async createCustomer(create_dtoo: CreateCustomerDto){
	// 	try {
	// 		return await this.customerRepository
	// 	} catch (error) {

	// 	}
	// }

	async checkExistField(field: string, value: string): Promise<any> {
		return await this.customerRepository.checkFieldExist(field, value);
	}
}
