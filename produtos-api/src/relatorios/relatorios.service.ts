import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThanOrEqual } from 'typeorm';
import { Produto } from '../produtos/produto.entity';

@Injectable()
export class RelatoriosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
  ) {}

  async getResumoGeral() {
    const [
      totalProdutos,
      produtosAtivos,
      produtosInativos,
      totalEstoque,
      valorTotalEstoque
    ] = await Promise.all([
      this.produtoRepo.count(),
      this.produtoRepo.count({ where: { ativo: true } }),
      this.produtoRepo.count({ where: { ativo: false } }),
      this.produtoRepo
        .createQueryBuilder('produto')
        .select('SUM(produto.estoque)', 'total')
        .getRawOne(),
      this.produtoRepo
        .createQueryBuilder('produto')
        .select('SUM(produto.estoque * produto.preco)', 'valorTotal')
        .getRawOne()
    ]);

    return {
      totalProdutos,
      produtosAtivos,
      produtosInativos,
      totalEstoque: totalEstoque?.total || 0,
      valorTotalEstoque: parseFloat(valorTotalEstoque?.valorTotal || '0'),
      percentualAtivos: totalProdutos > 0 ? ((produtosAtivos / totalProdutos) * 100).toFixed(1) : '0'
    };
  }

  async getEstoqueBaixo(limiteMinimo: number = 5) {
    const produtosEstoqueBaixo = await this.produtoRepo.find({
      where: { estoque: LessThan(limiteMinimo) },
      order: { estoque: 'ASC' }
    });

    return {
      quantidade: produtosEstoqueBaixo.length,
      produtos: produtosEstoqueBaixo.map(p => ({
        id: p.id,
        nome: p.nome,
        estoque: p.estoque,
        preco: p.preco,
        status: p.estoque === 0 ? 'SEM ESTOQUE' : 'ESTOQUE BAIXO'
      }))
    };
  }

  async getProdutosPorPreco() {
    const [maisCaro, maisBarato, mediaPrecos] = await Promise.all([
      this.produtoRepo.findOne({
        order: { preco: 'DESC' }
      }),
      this.produtoRepo.findOne({
        order: { preco: 'ASC' }
      }),
      this.produtoRepo
        .createQueryBuilder('produto')
        .select('AVG(produto.preco)', 'media')
        .getRawOne()
    ]);

    return {
      maisCaro: maisCaro ? {
        id: maisCaro.id,
        nome: maisCaro.nome,
        preco: maisCaro.preco
      } : null,
      maisBarato: maisBarato ? {
        id: maisBarato.id,
        nome: maisBarato.nome,
        preco: maisBarato.preco
      } : null,
      mediaPrecos: parseFloat(mediaPrecos?.media || '0')
    };
  }

  async getEstatisticasTemporais() {
    const hoje = new Date();
    const umMesAtras = new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate());

    const [produtosUltimoMes, produtosUltimaSemana] = await Promise.all([
      this.produtoRepo.count({
        where: { dataCriacao: MoreThanOrEqual(umMesAtras) }
      }),
      this.produtoRepo.count({
        where: { 
          dataCriacao: MoreThanOrEqual(new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000))
        }
      })
    ]);

    return {
      produtosUltimoMes,
      produtosUltimaSemana,
      periodoAnalise: {
        inicio: umMesAtras.toISOString().split('T')[0],
        fim: hoje.toISOString().split('T')[0]
      }
    };
  }
}
