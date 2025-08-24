import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos.services';
import { Produtos } from '../../models/produtos.model';

@Component({
  selector: 'app-produtos-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtos-lista.component.html',
  styleUrl: './produtos-lista.component.css'
})
export class ProdutosListaComponent implements OnInit {
  produtos: Produtos[] = [];
  carregando = false;
  erro = '';

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.erro = '';
    
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
    });
  }

  editarProduto(id: number): void {
    this.router.navigate(['/produtos/editar', id]);
  }

  deletarProduto(id: number): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtosService.deletarProdutos(id).subscribe({
        next: () => {
          this.carregarProdutos(); // Recarrega a lista
          alert('Produto deletado com sucesso!');
        },
        error: (error) => {
          alert('Erro ao deletar produto: ' + error.message);
          console.error('Erro:', error);
        }
      });
    }
  }

  novoProduto(): void {
    this.router.navigate(['/produtos/novo']);
  }

  voltarParaDashboard(): void {
    this.router.navigate(['/']);
  }
}