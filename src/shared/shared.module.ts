import { Global, Module, type Provider } from '@nestjs/common';
import { JWTService } from './services/jwt.service';
import { JwtAccessTokenStrategy } from './services/jwt-access-token.strategy';
import { CustomerModule } from 'src/modules/customer/customer.module';

const providers: Provider[] = [JWTService, JwtAccessTokenStrategy];

@Global()
@Module({
	imports: [CustomerModule],
	providers: [...providers],
	exports: [...providers],
})
export class SharedModule {}
