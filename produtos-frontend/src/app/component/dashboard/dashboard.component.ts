import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../services/produtos.services';
import { RelatoriosService } from '../../services/relatorios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  estatisticasRapidas: any = null;
  carregando = false;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private produtosService: ProdutosService,
    private relatoriosService: RelatoriosService
  ) {}

  ngOnInit(): void {
    this.carregarEstatisticas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  carregarEstatisticas(): void {
    this.carregando = true;
    
    // Carrega produtos primeiro
    this.subscription.add(
      this.produtosService.getProdutos().subscribe({
        next: () => {
          // Após carregar produtos, obtém estatísticas rápidas
          this.estatisticasRapidas = this.produtosService.getEstatisticasRapidas();
          this.carregando = false;
        },
        error: (error) => {
          console.error('Erro ao carregar produtos:', error);
          this.carregando = false;
        }
      })
    );
  }

  atualizarEstatisticas(): void {
    this.carregarEstatisticas();
  }

  //Metodos para navegação
  irParaLista() {
    this.router.navigate(['/produtos']);
  }

  irParaNovoProduto() {
    this.router.navigate(['/produtos/novo']);
  }
  
  irParaRelatorios() {
    this.router.navigate(['/relatorios']);
  }
  
  irParaEditarProduto(id: number) {
    this.router.navigate(['/produtos/editar', id]);
  }

  // Getters para facilitar o acesso aos dados
  get totalProdutos(): number {
    return this.estatisticasRapidas?.total || 0;
  }

  get produtosAtivos(): number {
    return this.estatisticasRapidas?.ativos || 0;
  }

  get produtosInativos(): number {
    return this.estatisticasRapidas?.inativos || 0;
  }

  get estoqueBaixo(): number {
    return this.estatisticasRapidas?.estoqueBaixo || 0;
  }

  get temProdutos(): boolean {
    return this.totalProdutos > 0;
  }

  get temEstoqueBaixo(): boolean {
    return this.estoqueBaixo > 0;
  }

  get percentualAtivos(): string {
    if (this.totalProdutos === 0) return '0%';
    return ((this.produtosAtivos / this.totalProdutos) * 100).toFixed(1) + '%';
  }
}