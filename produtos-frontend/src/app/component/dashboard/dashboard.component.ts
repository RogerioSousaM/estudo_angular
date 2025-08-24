import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router) {}

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
}