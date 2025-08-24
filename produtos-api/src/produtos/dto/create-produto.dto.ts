import { IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @MaxLength(100)
  nome: string;

  @IsNumber()
  @Min(0)
  preco: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descricao?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estoque?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
