import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProdutosListaComponent } from './component/produtos-lista/produtos-lista.component';
import { ProdutosFormComponent } from './component/produtos-form/produtos-form.component';
import { RelatoriosComponent } from './component/relatorios/relatorios.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'produtos', component: ProdutosListaComponent },
  { path: 'produtos/novo', component: ProdutosFormComponent },
  { path: 'produtos/editar/:id', component: ProdutosFormComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: '**', redirectTo: '' } // Rota padrão para páginas não encontradas
];