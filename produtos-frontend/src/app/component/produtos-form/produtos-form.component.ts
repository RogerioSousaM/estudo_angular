import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos.services';
import { Produtos } from '../../models/produtos.model';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produtos-form.component.html',
  styleUrl: './produtos-form.component.css'
})
export class ProdutosFormComponent implements OnInit {
  produtoForm!: FormGroup;
  editando = false;
  produtoId?: number;
  carregando = false;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.verificarSeEditando();
  }

  inicializarFormulario(): void {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      preco: ['', [Validators.required, Validators.min(0)]],
      descricao: ['', Validators.maxLength(500)],
      estoque: [0, [Validators.required, Validators.min(0)]],
      ativo: [true]
    });
  }

  verificarSeEditando(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.produtoId = +id;
      this.carregarProduto(this.produtoId);
    }
  }

  carregarProduto(id: number): void {
    this.carregando = true;
    this.produtosService.getProduto(id).subscribe({
      next: (produto) => {
        this.produtoForm.patchValue(produto);
        this.carregando = false;
      },
      error: (error) => {
        this.erro = 'Erro ao carregar produto: ' + error.message;
        this.carregando = false;
        console.error('Erro:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.produtoForm.valid) {
      this.carregando = true;
      const produtoData = this.produtoForm.value;

      if (this.editando && this.produtoId) {
        // Atualizando produto existente
        this.produtosService.atualizarProduto(this.produtoId, produtoData).subscribe({
          next: () => {
            alert('Produto atualizado com sucesso!');
            this.router.navigate(['/produtos']);
          },
          error: (error) => {
            this.erro = 'Erro ao atualizar produto: ' + error.message;
            this.carregando = false;
            console.error('Erro:', error);
          }
        });
      } else {
        // Criando novo produto
        this.produtosService.criarProduto(produtoData).subscribe({
          next: () => {
            alert('Produto criado com sucesso!');
            this.router.navigate(['/produtos']);
          },
          error: (error) => {
            this.erro = 'Erro ao criar produto: ' + error.message;
            this.carregando = false;
            console.error('Erro:', error);
          }
        });
      }
    } else {
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.produtoForm.controls).forEach(key => {
      const control = this.produtoForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }

  voltarParaDashboard(): void {
    this.router.navigate(['/']);
  }

  // Getters para facilitar o acesso no template
  get nome() { return this.produtoForm.get('nome'); }
  get preco() { return this.produtoForm.get('preco'); }
  get descricao() { return this.produtoForm.get('descricao'); }
  get estoque() { return this.produtoForm.get('estoque'); }
  get ativo() { return this.produtoForm.get('ativo'); }
}