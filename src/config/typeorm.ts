import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(`${process.env.DB_PORT}`),
	username: `${process.env.DB_USERNAME}`,
	password: `${process.env.DB_PASSWORD}`,
	database: `${process.env.DB_DATABASE}`,
	entities: ['dist/entity/**/*.entity{.ts,.js}'],
	migrations: ['../database/migrations/*{.ts,.js}'],
	autoLoadEntities: false,
	synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
