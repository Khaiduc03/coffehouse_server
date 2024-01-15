import { Global, Module, type Provider } from '@nestjs/common';
import { JWTService } from './services/jwt.service';

const providers: Provider[] = [JWTService];

@Global()
@Module({
	providers: [...providers],
	exports: [...providers],
})
export class SharedModule {}
