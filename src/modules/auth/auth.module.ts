import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyTokenEntity } from 'src/entity';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/customer.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		CustomerModule,
		JwtModule.register({}),
		TypeOrmModule.forFeature([KeyTokenEntity]),
	],
	controllers: [AuthController],
	providers: [AuthService, CustomerService],
})
export class AuthModule {}
