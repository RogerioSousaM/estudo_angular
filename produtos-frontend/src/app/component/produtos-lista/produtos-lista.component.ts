import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos.services';
import { RelatoriosService } from '../../services/relatorios.service';
import { Produtos } from '../../models/produtos.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produtos-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtos-lista.component.html',
  styleUrl: './produtos-lista.component.css'
})
export class ProdutosListaComponent implements OnInit, OnDestroy {
  produtos: Produtos[] = [];
  carregando = false;
  erro = '';
  private subscription = new Subscription();

  constructor(
    private produtosService: ProdutosService,
    private relatoriosService: RelatoriosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.erro = '';
    
    this.subscription.add(
      this.produtosService.getProdutos().subscribe({
        next: (produtos) => {
          this.produtos = produtos;
          this.carregando = false;
        },
        error: (error) => {
          this.erro = 'Erro ao carregar produtos: ' + error.message;
          this.carregando = false;
          console.error('Erro:', error);
        }
      })
    );
  }

  editarProduto(id: number): void {
    this.router.navigate(['/produtos/editar', id]);
  }

  deletarProduto(id: number): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.subscription.add(
        this.produtosService.deletarProdutos(id).subscribe({
          next: () => {
            this.carregarProdutos(); // Recarrega a lista
            this.atualizarRelatorios(); // Atualiza os relatórios
            alert('Produto deletado com sucesso!');
          },
          error: (error) => {
            alert('Erro ao deletar produto: ' + error.message);
            console.error('Erro:', error);
          }
        })
      );
    }
  }

  atualizarRelatorios(): void {
    // Atualiza os relatórios para refletir as mudanças
    this.subscription.add(
      this.relatoriosService.refreshRelatorios().subscribe({
        next: () => {
          console.log('Relatórios atualizados após exclusão de produto');
        },
        error: (error) => {
          console.error('Erro ao atualizar relatórios:', error);
        }
      })
    );
  }

  novoProduto(): void {
    this.router.navigate(['/produtos/novo']);
  }

  voltarParaDashboard(): void {
    this.router.navigate(['/']);
  }

  // Getters para facilitar o acesso aos dados
  get temProdutos(): boolean {
    return this.produtos.length > 0;
  }

  get produtosAtivos(): Produtos[] {
    return this.produtos.filter(p => p.ativo);
  }

  get produtosInativos(): Produtos[] {
    return this.produtos.filter(p => !p.ativo);
  }

  get produtosEstoqueBaixo(): Produtos[] {
    return this.produtos.filter(p => (p.estoque || 0) < 5);
  }

  get totalEstoque(): number {
    return this.produtos.reduce((total, p) => total + (p.estoque || 0), 0);
  }

  get valorTotalEstoque(): number {
    return this.produtos
      .filter(p => p.ativo)
      .reduce((total, p) => total + ((p.preco || 0) * (p.estoque || 0)), 0);
  }

  // Métodos auxiliares para verificar valores
  getEstoqueSeguro(produto: Produtos): number {
    return produto.estoque || 0;
  }

  getPrecoSeguro(produto: Produtos): number {
    return produto.preco || 0;
  }

  getAtivoSeguro(produto: Produtos): boolean {
    return produto.ativo ?? true;
  }
}