import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
  ) {}

  async findAll() {
    return await this.produtoRepo.find({
      order: { dataCriacao: 'DESC' }
    });
  }

  async findOne(id: number) {
    const produto = await this.produtoRepo.findOneBy({ id });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  async create(createProdutoDto: CreateProdutoDto) {
    const produto = this.produtoRepo.create(createProdutoDto);
    return await this.produtoRepo.save(produto);
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.findOne(id);
    Object.assign(produto, updateProdutoDto);
    return await this.produtoRepo.save(produto);
  }

  async remove(id: number) {
    const produto = await this.findOne(id);
    return await this.produtoRepo.remove(produto);
  }

  async findAtivos() {
    return await this.produtoRepo.find({
      where: { ativo: true },
      order: { nome: 'ASC' }
    });
  }
}
