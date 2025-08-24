import { DataSource } from 'typeorm';
import { Produto } from '../produtos/produto.entity';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'localhost',
  username: 'user',
  password: '123',
  database: 'Loja',
  entities: [Produto],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: 'SQLEXPRESS01',
  },
});
