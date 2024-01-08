import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
	type: 'postgres',
	host: 'localhost',
	port: Number(`${process.env.DB_PORT}`),
	username: `${process.env.DB_USERNAME}`,
	password: `${process.env.DB_PASSWORD}`,
	database: `${process.env.DB_DATABASE}`,
	entities: ['dist/src/entity/**/*.entity{.ts,.js}'],
	migrations: ['src/database/migrations/*{.ts,.js}'],
	autoLoadEntities: true,
	synchronize: false,
};

export const connectionSource = new DataSource(config as DataSourceOptions);