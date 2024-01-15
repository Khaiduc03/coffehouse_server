import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import {
	CannotCreateEntityIdMapError,
	EntityNotFoundError,
	QueryFailedError,
} from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const req = ctx.getRequest();
		const res = ctx.getResponse();

		let message = (exception as any).message;
		let status = HttpStatus.INTERNAL_SERVER_ERROR;

		Logger.error(
			`================> ${message}`,
			(exception as any).stack,
			`${req.method} ${req.url}`,
		);

		switch (exception.constructor) {
			case HttpException:
				status = (exception as HttpException).getStatus();
				message = (exception as HttpException).message;
				break;
			case Error:
				status = HttpStatus.INTERNAL_SERVER_ERROR;
				break;
			case QueryFailedError:
				status = HttpStatus.UNPROCESSABLE_ENTITY;
				message = (exception as QueryFailedError).message;
				break;
			case EntityNotFoundError:
				status = HttpStatus.UNPROCESSABLE_ENTITY;
				message = (exception as EntityNotFoundError).message;

				break;
			case CannotCreateEntityIdMapError: // and another
				status = HttpStatus.UNPROCESSABLE_ENTITY;
				message = (exception as CannotCreateEntityIdMapError).message;

				break;
			default:
				status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
				message = (exception as any).message || 'Internal server error';
				break;
		}

		res.status(status).json({
			statusCode: status,
			message: message,
			timestamp: new Date().toISOString(),
			path: req.url,
		});
	}
}
