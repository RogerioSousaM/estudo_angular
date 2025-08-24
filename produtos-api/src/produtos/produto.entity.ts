import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column({ length: 500, nullable: true })
  descricao: string;

  @Column({ default: 0 })
  estoque: number;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  dataCriacao: Date;

  @UpdateDateColumn()
  dataAtualizacao: Date;
}
