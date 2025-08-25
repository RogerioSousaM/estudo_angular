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
        .select('COALESCE(SUM(produto.estoque), 0)', 'total')
        .getRawOne(),
      this.produtoRepo
        .createQueryBuilder('produto')
        .select('COALESCE(SUM(produto.estoque * produto.preco), 0)', 'valorTotal')
        .where('produto.ativo = :ativo', { ativo: true })
        .getRawOne()
    ]);

    const totalEstoqueNum = parseFloat(totalEstoque?.total || '0');
    const valorTotalNum = parseFloat(valorTotalEstoque?.valorTotal || '0');
    const percentualAtivos = totalProdutos > 0 ? ((produtosAtivos / totalProdutos) * 100).toFixed(1) : '0';

    return {
      totalProdutos,
      produtosAtivos,
      produtosInativos,
      totalEstoque: totalEstoqueNum,
      valorTotalEstoque: valorTotalNum,
      percentualAtivos
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
        where: { ativo: true },
        order: { preco: 'DESC' }
      }),
      this.produtoRepo.findOne({
        where: { ativo: true },
        order: { preco: 'ASC' }
      }),
      this.produtoRepo
        .createQueryBuilder('produto')
        .select('COALESCE(AVG(produto.preco), 0)', 'media')
        .where('produto.ativo = :ativo', { ativo: true })
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
    const umaSemanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [produtosUltimoMes, produtosUltimaSemana] = await Promise.all([
      this.produtoRepo.count({
        where: { dataCriacao: MoreThanOrEqual(umMesAtras) }
      }),
      this.produtoRepo.count({
        where: { dataCriacao: MoreThanOrEqual(umaSemanaAtras) }
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

  // Novo método para obter todos os relatórios de uma vez
  async getAllRelatorios() {
    const [resumo, estoque, preco, tempo] = await Promise.all([
      this.getResumoGeral(),
      this.getEstoqueBaixo(),
      this.getProdutosPorPreco(),
      this.getEstatisticasTemporais()
    ]);

    return {
      resumoGeral: resumo,
      estoqueBaixo: estoque,
      produtosPorPreco: preco,
      estatisticasTemporais: tempo,
      timestamp: new Date().toISOString()
    };
  }
}
