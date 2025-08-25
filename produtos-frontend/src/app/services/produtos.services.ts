import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Produtos } from '../models/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = 'http://localhost:3000/produtos';
  
  // BehaviorSubject para armazenar a lista de produtos
  private produtosSubject = new BehaviorSubject<Produtos[]>([]);
  public produtos$ = this.produtosSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Buscar todos os produtos
  getProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(this.apiUrl).pipe(
      tap(produtos => {
        this.produtosSubject.next(produtos);
      })
    );
  }

  // Buscar produto por ID
  getProduto(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(`${this.apiUrl}/${id}`);
  }

  // Criar novo produto
  criarProduto(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.apiUrl, produto).pipe(
      tap(novoProduto => {
        // Atualiza a lista local
        const produtosAtuais = this.produtosSubject.value;
        this.produtosSubject.next([novoProduto, ...produtosAtuais]);
      })
    );
  }

  // Atualizar produto
  atualizarProduto(id: number, produto: Produtos): Observable<Produtos> {
    return this.http.put<Produtos>(`${this.apiUrl}/${id}`, produto).pipe(
      tap(produtoAtualizado => {
        // Atualiza a lista local
        const produtosAtuais = this.produtosSubject.value;
        const index = produtosAtuais.findIndex(p => p.id === id);
        if (index !== -1) {
          produtosAtuais[index] = produtoAtualizado;
          this.produtosSubject.next([...produtosAtuais]);
        }
      })
    );
  }

  // Deletar produto
  deletarProdutos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Remove da lista local
        const produtosAtuais = this.produtosSubject.value;
        const produtosFiltrados = produtosAtuais.filter(p => p.id !== id);
        this.produtosSubject.next(produtosFiltrados);
      })
    );
  }

  // Buscar produtos ativos
  getProdutosAtivos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${this.apiUrl}/ativos`);
  }

  // Método para atualizar a lista de produtos
  refreshProdutos(): Observable<Produtos[]> {
    return this.getProdutos();
  }

  // Método para obter os produtos atuais sem fazer nova requisição
  getCurrentProdutos(): Produtos[] {
    return this.produtosSubject.value;
  }

  // Método para verificar se há produtos
  get temProdutos(): boolean {
    return this.produtosSubject.value.length > 0;
  }

  // Método para obter estatísticas rápidas
  getEstatisticasRapidas() {
    const produtos = this.produtosSubject.value;
    if (produtos.length === 0) {
      return {
        total: 0,
        ativos: 0,
        inativos: 0,
        estoqueBaixo: 0
      };
    }

    const ativos = produtos.filter(p => p.ativo ?? true).length;
    const estoqueBaixo = produtos.filter(p => (p.estoque || 0) < 5).length;

    return {
      total: produtos.length,
      ativos,
      inativos: produtos.length - ativos,
      estoqueBaixo
    };
  }
}