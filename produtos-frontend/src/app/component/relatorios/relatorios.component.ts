import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RelatoriosService } from '../../services/relatorios.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent implements OnInit {
  resumoGeral: any = null;
  estoqueBaixo: any = null;
  produtosPorPreco: any = null;
  estatisticasTemporais: any = null;
  carregando = false;
  erro = '';

  constructor(
    private relatoriosService: RelatoriosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarRelatorios();
  }

  carregarRelatorios(): void {
    this.carregando = true;
    this.erro = '';

    Promise.all([
      this.relatoriosService.getResumoGeral(),
      this.relatoriosService.getEstoqueBaixo(),
      this.relatoriosService.getProdutosPorPreco(),
      this.relatoriosService.getEstatisticasTemporais()
    ]).then(([resumo, estoque, preco, tempo]) => {
      this.resumoGeral = resumo;
      this.estoqueBaixo = estoque;
      this.produtosPorPreco = preco;
      this.estatisticasTemporais = tempo;
      this.carregando = false;
      console.log('Dados carregados:', { resumo, estoque, preco, tempo });
    }).catch(error => {
      this.erro = 'Erro ao carregar relatórios: ' + error.message;
      this.carregando = false;
      console.error('Erro:', error);
    });
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

  // Verificações de segurança para os dados
  getValorSeguro(obj: any, propriedade: string, padrao: any = 0): any {
    if (!obj || obj[propriedade] === null || obj[propriedade] === undefined) {
      return padrao;
    }
    return obj[propriedade];
  }
}
