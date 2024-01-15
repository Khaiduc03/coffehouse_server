import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-error.filter';
import { LoggerMiddleware } from './config/logger.config';

declare const module: any;
async function bootstrap() {
	const PORT = process.env.PORT;
	console.log(PORT);

	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
		{ cors: true, logger: new Logger() },
	);

	app.use(LoggerMiddleware);

	const { httpAdapter } = app.get(HttpAdapterHost);
	// app.enable('trust proxy');
	app.use(helmet());
	app.use(compression());
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
		}),
	);

	app.useGlobalFilters(
		// new QueryFailedFilter({ httpAdapter }),
		// new AllExceptionsFilter({ httpAdapter }),
		new GlobalExceptionFilter(),
	);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
	console.info(`server running on ${await app.getUrl()}`);
}
bootstrap().catch((error) => {
	Logger.error(`Server Can Not Start. Error: ${error.message}`, false);
	process.exit(1);
});
