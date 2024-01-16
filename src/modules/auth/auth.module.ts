import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyTokenEntity } from 'src/entity';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/customer.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [CustomerModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, CustomerService, LocalStrategy],
})
export class AuthModule {}
