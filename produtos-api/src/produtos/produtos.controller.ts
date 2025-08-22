import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  // GET /produtos
  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  // GET /produtos/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.findOne(id);
  }

  // POST /produtos
  @Post()
  create(@Body('nome') nome: string, @Body('preco') preco: number) {
    return this.produtosService.create(nome, preco);
  }

  // PUT /produtos/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('nome') nome: string,
    @Body('preco') preco: number,
  ) {
    return this.produtosService.update(id, nome, preco);
  }

  // DELETE /produtos/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.remove(id);
  }
}
