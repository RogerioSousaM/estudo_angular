import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router) {}

  //Metodos para navegação
  irParaLista() {
    this.router.navigate(['/prudutos']);
  }

  irParaNovoProduto() {
    this.router.navigate(['/produtos/novo']);
  }
  irParaEditarProduto(id: number) {
    this.router.navigate(['/produtos/editar', id]);
  }

}
