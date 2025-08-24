import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosModule } from './produtos/produtos.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { AppDataSource } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ProdutosModule,
    RelatoriosModule,
  ],
})
export class AppModule {}