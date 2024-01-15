import { STATUS_CODES } from 'http';

import {
	Catch,
	HttpException,
	HttpStatus,
	type ArgumentsHost,
	type ExceptionFilter,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter<QueryFailedError> {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: QueryFailedError, host: ArgumentsHost) {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();
		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		console.log(
			'You have error query at endpoint:',
			httpAdapter.getRequestUrl(ctx.getRequest()),
		);
		console.log('ERROR: ', exception.message);
		console.log('QUERY: ', exception.query);
		const responseBody = {
			statusCode: httpStatus,
			error: STATUS_CODES[httpStatus],
			timestamp: new Date().toUTCString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
