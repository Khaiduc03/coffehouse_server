import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerWithEmailDto } from './dto/customer-register.dto';

@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post()
	async createCustomer(@Body() createCustomerDto: CreateCustomerWithEmailDto) {}
}
