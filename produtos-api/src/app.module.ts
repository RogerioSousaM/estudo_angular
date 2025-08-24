import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      username: 'user', 
      password: '123',
      database: 'Loja',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
        // IMPORTANTE: Nome da instância
        instanceName: 'SQLEXPRESS01',
      },
    }),
    ProdutosModule,
  ],
})
export class AppModule {}