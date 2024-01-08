import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Logger } from '@nestjs/common';
declare const module: any;
async function bootstrap() {
	const PORT = process.env.PORT;
	console.log(PORT);

	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
		{ cors: true },
	);
	// app.enable('trust proxy');
	app.use(helmet());
	app.use(compression());
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
		}),
	);
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
