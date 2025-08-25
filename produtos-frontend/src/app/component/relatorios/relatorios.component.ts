import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RelatoriosService, TodosRelatorios } from '../../services/relatorios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent implements OnInit, OnDestroy {
  relatorios: TodosRelatorios | null = null;
  carregando = false;
  erro = '';
  private subscription = new Subscription();

  constructor(
    private relatoriosService: RelatoriosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarRelatorios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  carregarRelatorios(): void {
    this.carregando = true;
    this.erro = '';

    this.subscription.add(
      this.relatoriosService.getAllRelatorios().subscribe({
        next: (relatorios) => {
          this.relatorios = relatorios;
          this.carregando = false;
          console.log('Relatórios carregados:', relatorios);
        },
        error: (error) => {
          this.erro = 'Erro ao carregar relatórios: ' + error.message;
          this.carregando = false;
          console.error('Erro:', error);
        }
      })
    );
  }

  atualizarRelatorios(): void {
    this.carregarRelatorios();
  }

  voltarParaDashboard(): void {
    this.router.navigate(['/']);
  }

  formatarMoeda(valor: number): string {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return 'R$ 0,00';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarPercentual(valor: string | number): string {
    if (valor === null || valor === undefined || valor === '') {
      return '0%';
    }
    const numValor = typeof valor === 'string' ? parseFloat(valor) : valor;
    if (isNaN(numValor)) {
      return '0%';
    }
    return numValor.toFixed(1) + '%';
  }

  formatarNumero(valor: number): string {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return '0';
    }
    return valor.toString();
  }

  // Getters para facilitar o acesso aos dados
  get resumoGeral() {
    return this.relatorios?.resumoGeral || null;
  }

  get estoqueBaixo() {
    return this.relatorios?.estoqueBaixo || null;
  }

  get produtosPorPreco() {
    return this.relatorios?.produtosPorPreco || null;
  }

  get estatisticasTemporais() {
    return this.relatorios?.estatisticasTemporais || null;
  }

  // Verificações de segurança para os dados
  getValorSeguro(obj: any, propriedade: string, padrao: any = 0): any {
    if (!obj || obj[propriedade] === null || obj[propriedade] === undefined) {
      return padrao;
    }
    return obj[propriedade];
  }

  // Verificar se há produtos com estoque baixo
  get temEstoqueBaixo(): boolean {
    return this.estoqueBaixo ? this.estoqueBaixo.quantidade > 0 : false;
  }

  // Verificar se há produtos cadastrados
  get temProdutos(): boolean {
    return this.resumoGeral ? this.resumoGeral.totalProdutos > 0 : false;
  }

  // Verificar se o timestamp existe
  get timestampExiste(): boolean {
    return this.relatorios?.timestamp ? true : false;
  }

  // Obter timestamp seguro
  getTimestampSeguro(): string {
    return this.relatorios?.timestamp || '';
  }
}
