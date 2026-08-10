SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS states (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    country_id BIGINT UNSIGNED NOT NULL,

    iso_code VARCHAR(20) DEFAULT NULL,

    name VARCHAR(150) NOT NULL,

    native_name VARCHAR(150) DEFAULT NULL,

    state_code VARCHAR(20) DEFAULT NULL,

    latitude DECIMAL(10,7) DEFAULT NULL,

    longitude DECIMAL(10,7) DEFAULT NULL,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_country_state (
        country_id,
        name
    ),

    INDEX idx_state_name (
        name
    ),

    INDEX idx_country (
        country_id
    ),

    INDEX idx_active (
        is_active
    ),

    CONSTRAINT fk_states_country
        FOREIGN KEY (country_id)
        REFERENCES countries(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

DELIMITER $$

DROP TRIGGER IF EXISTS trg_states_before_insert $$

CREATE TRIGGER trg_states_before_insert
BEFORE INSERT
ON states
FOR EACH ROW
BEGIN

    SET NEW.name = TRIM(NEW.name);

    IF NEW.native_name IS NOT NULL THEN
        SET NEW.native_name = TRIM(NEW.native_name);
    END IF;

END $$

DROP TRIGGER IF EXISTS trg_states_before_update $$

CREATE TRIGGER trg_states_before_update
BEFORE UPDATE
ON states
FOR EACH ROW
BEGIN

    SET NEW.name = TRIM(NEW.name);

    IF NEW.native_name IS NOT NULL THEN
        SET NEW.native_name = TRIM(NEW.native_name);
    END IF;

END $$

DELIMITER ;

CREATE OR REPLACE VIEW vw_states AS

SELECT

    s.id,

    s.country_id,

    c.name AS country_name,

    s.iso_code,

    s.state_code,

    s.name,

    s.native_name,

    s.latitude,

    s.longitude,

    s.is_active,

    s.created_at

FROM states s

INNER JOIN countries c
    ON c.id = s.country_id

WHERE s.is_active = 1;

SET FOREIGN_KEY_CHECKS = 1;