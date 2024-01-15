import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadDto } from './token-payload.dto';

export class LoginPayloadDto {
	@ApiProperty()
	id: string;
	@ApiProperty()
	email: string;
	@ApiProperty()
	token: TokenPayloadDto;
}
