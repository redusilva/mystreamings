CREATE DATABASE IF NOT EXISTS `medeve`;
USE `medeve`;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gastosRecorrentes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `valor` FLOAT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `usuariosGastosRecorrentes` (
  `idGastosRecorrentes` INT NOT NULL,
  `idUsuarios` INT NOT NULL,
  PRIMARY KEY (`idGastosRecorrentes`, `idUsuarios`),
  CONSTRAINT `fk_gastosRecorrentes_has_usuarios_gastosRecorrentes1`
    FOREIGN KEY (`idGastosRecorrentes`)
    REFERENCES `gastosRecorrentes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gastosRecorrentes_has_usuarios_usuarios1`
    FOREIGN KEY (`idUsuarios`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gastos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `valor` FLOAT NULL,
  `mes` TINYINT NULL,
  `ano` INT NULL,
  `estado` TINYINT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `usuariosGastos` (
  `usuarios_id` INT NOT NULL,
  `gastos_id` INT NOT NULL,
  PRIMARY KEY (`usuarios_id`, `gastos_id`),
  CONSTRAINT `fk_usuarios_has_gastos_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_gastos_gastos1`
    FOREIGN KEY (`gastos_id`)
    REFERENCES `gastos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
