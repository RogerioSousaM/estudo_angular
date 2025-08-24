import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtos } from '../models/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  // Buscar todos os produtos
  getProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(this.apiUrl);
  }

  // Buscar produto por ID
  getProduto(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(`${this.apiUrl}/${id}`);
  }

  // Criar novo produto
  criarProduto(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.apiUrl, produto);
  }

  // Atualizar produto
  atualizarProduto(id: number, produto: Produtos): Observable<Produtos> {
    return this.http.put<Produtos>(`${this.apiUrl}/${id}`, produto);
  }

  // Deletar produto
  deletarProdutos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar produtos ativos
  getProdutosAtivos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${this.apiUrl}/ativos`);
  }
}