export interface Produtos {
    id?: number;
    nome: string;
    preco: number;
    descricao?: string;
    estoque?: number;
    ativo?: boolean;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    
}