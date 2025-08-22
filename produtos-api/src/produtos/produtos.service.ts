import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';

@Injectable()
export class ProdutosService {
    private produtos = [
        {id: 1, nome: 'Produto 1', preco: 10},
        {id: 2, nome: 'Produto 2', preco: 20},
    
    ];

    private nextId = 3;

    //listar todos
    findAll(){
        return this.produtos;
    }
    
    //buscar por id
    findOne(id: number){
        const produto = this.produtos.find(p => p.id === id);
        if(!produto) throw new NotFoundException('Produto não encontrado');
        return produto;
    }

    //criar produto
    create(nome: string, preco:number) {
        const produto = {id: this.nextId++, nome, preco };
        this.produtos.push(produto);
        return produto;
    }
    //atualizar produto
    update(id: number, nome: string, preco:number){
        const produto = this.findOne(id);
        produto.nome = nome;
        produto.preco = preco;
        return produto
    }

    //deletar produto
    remove(id: number){
        const index = this.produtos.findIndex( p => p.id === id);
        if (index === -1) throw new NotFoundException('Produto não encontrado');
        const produtoRemovido = this.produtos.splice(index, 1);
        return produtoRemovido[0];
        }
}
