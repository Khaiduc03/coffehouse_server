import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
	@ApiProperty()
	refresh_token: string;

	@ApiProperty()
	access_token: string;

	constructor(data: { refresh_token: string; access_token: string }) {
		this.access_token = data.access_token;
		this.refresh_token = data.refresh_token;
	}
}
