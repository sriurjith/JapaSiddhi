SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS festivals (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    festival_name VARCHAR(200) NOT NULL,

    description TEXT DEFAULT NULL,

    festival_date DATE NOT NULL,

    festival_type ENUM(
        'HINDU',
        'BIRTHDAY',
        'ANNIVERSARY',
        'SPECIAL'
    ) NOT NULL DEFAULT 'HINDU',

    is_public_holiday TINYINT(1) NOT NULL DEFAULT 0,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    display_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_date (festival_date),

    INDEX idx_type (festival_type),

    INDEX idx_active (is_active)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;