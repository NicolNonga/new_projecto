-- CreateTable
CREATE TABLE `pedido` (
    `id_pedido` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_multas` VARCHAR(20) NULL,
    `codigo_regime` VARCHAR(50) NULL,
    `consignatario_importador` VARCHAR(255) NULL,
    `codigo_avaliacao_autorizado` VARCHAR(255) NULL,
    `nome_entidade_angola` VARCHAR(100) NULL,
    `manifesto_numero` VARCHAR(50) NULL,
    `numero_total_adicoes` INTEGER NULL,
    `despachante` VARCHAR(100) NULL,
    `entidade_estrangeira` VARCHAR(100) NULL,
    `descricao_mercadoria` TEXT NULL,
    `pais_origem` VARCHAR(50) NULL,
    `pais_destino` VARCHAR(50) NULL,
    `porto_entrada` VARCHAR(100) NULL,
    `data_chegada` DATETIME(3) NULL,
    `numero_fatura_proforma` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transporte` (
    `id_transporte` INTEGER NOT NULL AUTO_INCREMENT,
    `pedido_id` INTEGER NOT NULL,
    `meio_transporte` VARCHAR(100) NULL,
    `nacionalidade_meio_transporte` VARCHAR(100) NULL,
    `registro_meio_transporte` VARCHAR(100) NULL,
    `num_documento_transporte` VARCHAR(100) NULL,
    `estancia_aduaneira` VARCHAR(100) NULL,
    `porto_origem` VARCHAR(100) NULL,
    `posto_fronteirico` VARCHAR(100) NULL,
    `peso_bruto` DECIMAL(10, 2) NULL,
    `local_embarque` VARCHAR(100) NULL,
    `local_desalfandegamento` VARCHAR(100) NULL,
    `pais_precedencia` VARCHAR(100) NULL,
    `referencia_processo_interno` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_transporte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mercadoria` (
    `id_mercadoria` INTEGER NOT NULL AUTO_INCREMENT,
    `pedido_id` INTEGER NOT NULL,
    `linha` INTEGER NULL,
    `codigo_pautal` VARCHAR(100) NULL,
    `quantidade` INTEGER NULL,
    `pais_origem_2` VARCHAR(100) NULL,
    `peso` DECIMAL(10, 2) NULL,
    `moeda_estrangeira` VARCHAR(10) NULL,
    `valor_fob` DECIMAL(10, 2) NULL,
    `valor_frete` DECIMAL(10, 2) NULL,
    `valor_cif` DECIMAL(10, 2) NULL,
    `unidade_medida` VARCHAR(20) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_mercadoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamento` (
    `id_pagamento` INTEGER NOT NULL AUTO_INCREMENT,
    `pedido_id` INTEGER NOT NULL,
    `metodo_avaliacao` VARCHAR(100) NULL,
    `banco_comercial` VARCHAR(100) NULL,
    `forma_pagamento` VARCHAR(100) NULL,
    `qtd_volume` INTEGER NULL,
    `codigo_volume` VARCHAR(50) NULL,
    `unidade` VARCHAR(20) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pagamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documento` (
    `id_documento` INTEGER NOT NULL AUTO_INCREMENT,
    `pedido_id` INTEGER NOT NULL,
    `tipo_documento` VARCHAR(50) NULL,
    `caminho_arquivo` VARCHAR(255) NULL,
    `codigo_pre_licenciamento` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transporte` ADD CONSTRAINT `transporte_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `pedido`(`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mercadoria` ADD CONSTRAINT `mercadoria_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `pedido`(`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamento` ADD CONSTRAINT `pagamento_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `pedido`(`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `documento_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `pedido`(`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE;
