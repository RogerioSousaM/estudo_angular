import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  ValidationPipe
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  // GET /produtos
  @Get()
  async findAll() {
    return await this.produtosService.findAll();
  }

  // GET /produtos/ativos
  @Get('ativos')
  async findAtivos() {
    return await this.produtosService.findAtivos();
  }

  // GET /produtos/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.produtosService.findOne(id);
  }

  // POST /produtos
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createProdutoDto: CreateProdutoDto) {
    return await this.produtosService.create(createProdutoDto);
  }

  // PUT /produtos/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProdutoDto: UpdateProdutoDto,
  ) {
    return await this.produtosService.update(id, updateProdutoDto);
  }

  // DELETE /produtos/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.produtosService.remove(id);
  }
}
