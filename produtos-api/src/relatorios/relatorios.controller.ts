import { Controller, Get } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get('resumo')
  async getResumoGeral() {
    return await this.relatoriosService.getResumoGeral();
  }

  @Get('estoque-baixo')
  async getEstoqueBaixo() {
    return await this.relatoriosService.getEstoqueBaixo();
  }

  @Get('produtos-por-preco')
  async getProdutosPorPreco() {
    return await this.relatoriosService.getProdutosPorPreco();
  }

  @Get('estatisticas-temporais')
  async getEstatisticasTemporais() {
    return await this.relatoriosService.getEstatisticasTemporais();
  }
}
