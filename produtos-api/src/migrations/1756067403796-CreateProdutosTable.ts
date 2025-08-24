import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProdutosTable1756067403796 implements MigrationInterface {
    name = 'CreateProdutosTable1756067403796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Produtos" ("id" int NOT NULL IDENTITY(1,1), "nome" nvarchar(100) NOT NULL, "preco" decimal(10,2) NOT NULL, "descricao" nvarchar(500), "estoque" int NOT NULL CONSTRAINT "DF_49b1c4444f07a98d2683d4f74d9" DEFAULT 0, "ativo" bit NOT NULL CONSTRAINT "DF_f4cf801a2a083410c446558f900" DEFAULT 1, "dataCriacao" datetime2 NOT NULL CONSTRAINT "DF_6e226fa65d68d6e8fe50fa13b6f" DEFAULT getdate(), "dataAtualizacao" datetime2 NOT NULL CONSTRAINT "DF_a610674c26ecc89a7efc48a5c0f" DEFAULT getdate(), CONSTRAINT "PK_dfb622e114b2e5a5b7c68317451" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Produtos"`);
    }

}
