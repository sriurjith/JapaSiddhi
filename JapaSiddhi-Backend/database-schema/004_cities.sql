SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS cities (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    country_id BIGINT UNSIGNED NOT NULL,

    state_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(150) NOT NULL,

    native_name VARCHAR(150) DEFAULT NULL,

    latitude DECIMAL(10,7) DEFAULT NULL,

    longitude DECIMAL(10,7) DEFAULT NULL,

    postal_code VARCHAR(20) DEFAULT NULL,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_city (
        country_id,
        state_id,
        name
    ),

    INDEX idx_city_name (
        name
    ),

    INDEX idx_country (
        country_id
    ),

    INDEX idx_state (
        state_id
    ),

    INDEX idx_active (
        is_active
    ),

    CONSTRAINT fk_cities_country
        FOREIGN KEY (country_id)
        REFERENCES countries(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_cities_state
        FOREIGN KEY (state_id)
        REFERENCES states(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

DELIMITER $$

DROP TRIGGER IF EXISTS trg_cities_before_insert $$

CREATE TRIGGER trg_cities_before_insert
BEFORE INSERT
ON cities
FOR EACH ROW
BEGIN

    SET NEW.name = TRIM(NEW.name);

    IF NEW.native_name IS NOT NULL THEN
        SET NEW.native_name = TRIM(NEW.native_name);
    END IF;

END $$

DROP TRIGGER IF EXISTS trg_cities_before_update $$

CREATE TRIGGER trg_cities_before_update
BEFORE UPDATE
ON cities
FOR EACH ROW
BEGIN

    SET NEW.name = TRIM(NEW.name);

    IF NEW.native_name IS NOT NULL THEN
        SET NEW.native_name = TRIM(NEW.native_name);
    END IF;

END $$

DELIMITER ;

CREATE OR REPLACE VIEW vw_cities AS

SELECT

    ci.id,

    ci.country_id,

    c.name AS country_name,

    ci.state_id,

    s.name AS state_name,

    ci.name,

    ci.native_name,

    ci.latitude,

    ci.longitude,

    ci.postal_code,

    ci.is_active,

    ci.created_at

FROM cities ci

INNER JOIN countries c
    ON c.id = ci.country_id

INNER JOIN states s
    ON s.id = ci.state_id

WHERE ci.is_active = 1;

SET FOREIGN_KEY_CHECKS = 1;