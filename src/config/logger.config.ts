import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): any {
	const { ip, method, path: url } = req;

	res.on('close', () => {
		const { statusCode } = res;

		Logger.debug(`${method} ${url} ${statusCode}  -  ipv6:${ip}🗿`);
	});

	next();
}
