import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-access-token.guard';

@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	// @Post()
	// async createCustomer(@Body() createCustomerDto: CreateCustomerWithEmailDto) {}

	@Get('test')
	@UseGuards(JwtAccessTokenGuard)
	async test(@Request() req: any) {
		console.log('req: ', req.user);
		return 'test';
	}
}
