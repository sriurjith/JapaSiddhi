SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS family_groups (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    group_name VARCHAR(200) NOT NULL,

    group_code VARCHAR(20) NOT NULL,

    created_by BIGINT UNSIGNED NOT NULL,

    description TEXT DEFAULT NULL,

    total_members INT NOT NULL DEFAULT 1,

    total_japa_count BIGINT NOT NULL DEFAULT 0,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_group_code (group_code),

    CONSTRAINT fk_family_group_creator
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_creator (created_by),

    INDEX idx_active (is_active)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;