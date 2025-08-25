import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ResumoGeral {
  totalProdutos: number;
  produtosAtivos: number;
  produtosInativos: number;
  totalEstoque: number;
  valorTotalEstoque: number;
  percentualAtivos: string;
}

export interface EstoqueBaixo {
  quantidade: number;
  produtos: Array<{
    id: number;
    nome: string;
    estoque: number;
    preco: number;
    status: string;
  }>;
}

export interface ProdutosPorPreco {
  maisCaro: {
    id: number;
    nome: string;
    preco: number;
  } | null;
  maisBarato: {
    id: number;
    nome: string;
    preco: number;
  } | null;
  mediaPrecos: number;
}

export interface EstatisticasTemporais {
  produtosUltimoMes: number;
  produtosUltimaSemana: number;
  periodoAnalise: {
    inicio: string;
    fim: string;
  };
}

export interface TodosRelatorios {
  resumoGeral: ResumoGeral;
  estoqueBaixo: EstoqueBaixo;
  produtosPorPreco: ProdutosPorPreco;
  estatisticasTemporais: EstatisticasTemporais;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private apiUrl = 'http://localhost:3000/relatorios';
  
  // BehaviorSubject para armazenar os dados mais recentes
  private relatoriosSubject = new BehaviorSubject<TodosRelatorios | null>(null);
  public relatorios$ = this.relatoriosSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Resumo geral do sistema
  getResumoGeral(): Observable<ResumoGeral> {
    return this.http.get<ResumoGeral>(`${this.apiUrl}/resumo`);
  }

  // Produtos com estoque baixo
  getEstoqueBaixo(): Observable<EstoqueBaixo> {
    return this.http.get<EstoqueBaixo>(`${this.apiUrl}/estoque-baixo`);
  }

  // Análise de preços
  getProdutosPorPreco(): Observable<ProdutosPorPreco> {
    return this.http.get<ProdutosPorPreco>(`${this.apiUrl}/produtos-por-preco`);
  }

  // Estatísticas temporais
  getEstatisticasTemporais(): Observable<EstatisticasTemporais> {
    return this.http.get<EstatisticasTemporais>(`${this.apiUrl}/estatisticas-temporais`);
  }

  // Obter todos os relatórios de uma vez
  getAllRelatorios(): Observable<TodosRelatorios> {
    return this.http.get<TodosRelatorios>(`${this.apiUrl}/todos`).pipe(
      tap(relatorios => {
        // Atualiza o BehaviorSubject com os dados mais recentes
        this.relatoriosSubject.next(relatorios);
      })
    );
  }

  // Método para atualizar os relatórios
  refreshRelatorios(): Observable<TodosRelatorios> {
    return this.getAllRelatorios();
  }

  // Método para obter os dados atuais sem fazer nova requisição
  getCurrentRelatorios(): TodosRelatorios | null {
    return this.relatoriosSubject.value;
  }
}
