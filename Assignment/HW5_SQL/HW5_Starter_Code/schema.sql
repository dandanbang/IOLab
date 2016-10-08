-- Insert code to create Database Schema
-- This will create your .db database file for use
CREATE TABLE IF NOT EXISTS `customer` (
  `first_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `customer_id` INTEGER NOT NULL,
  `company` VARCHAR(255) NULL,
  `phone` INT(100) NULL,
  PRIMARY KEY (`customer_id`));

CREATE TABLE IF NOT EXISTS `address` (
  `id` INTEGER NOT NULL,
  `street_address` VARCHAR(255) NULL,
  `city` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NULL,
  `country` VARCHAR(255) NULL,
  `zip_code` INTEGER NULL,
  `customer_customer_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_address_customer`
    FOREIGN KEY (`customer_customer_id`)
    REFERENCES `customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `order` (
  `order_id` INTEGER NOT NULL,
  `name_of_part` VARCHAR(255) NULL,
  `manufacturer_of_part` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`order_id`));

CREATE TABLE IF NOT EXISTS `order_has_customer` (
  `order_order_id` INTEGER NOT NULL,
  `customer_customer_id` INTEGER NOT NULL,
  `id` INTEGER NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_order_has_customer_order1`
    FOREIGN KEY (`order_order_id`)
    REFERENCES `order` (`order_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_has_customer_customer1`
    FOREIGN KEY (`customer_customer_id`)
    REFERENCES `customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
