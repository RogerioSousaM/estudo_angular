import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private apiUrl = 'http://localhost:3000/relatorios';

  constructor(private http: HttpClient) { }

  // Resumo geral do sistema
  getResumoGeral(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumo`);
  }

  // Produtos com estoque baixo
  getEstoqueBaixo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estoque-baixo`);
  }

  // Análise de preços
  getProdutosPorPreco(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produtos-por-preco`);
  }

  // Estatísticas temporais
  getEstatisticasTemporais(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estatisticas-temporais`);
  }
}
