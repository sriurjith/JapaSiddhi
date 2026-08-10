SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS global_japa_counter (

    id TINYINT UNSIGNED NOT NULL DEFAULT 1,

    total_japa_count BIGINT UNSIGNED NOT NULL DEFAULT 0,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT chk_single_row CHECK (id = 1)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

INSERT INTO global_japa_counter (
    id,
    total_japa_count
)
VALUES (
    1,
    0
)
ON DUPLICATE KEY UPDATE
total_japa_count = total_japa_count;

SET FOREIGN_KEY_CHECKS = 1;