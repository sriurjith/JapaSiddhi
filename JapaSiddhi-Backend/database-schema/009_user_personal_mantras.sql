SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS user_personal_mantras (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    mantra_name VARCHAR(200) NOT NULL,

    deity_name VARCHAR(100) DEFAULT NULL,

    mantra_text TEXT NOT NULL,

    transliteration TEXT DEFAULT NULL,

    preferred_japa_count INT NOT NULL DEFAULT 108,

    image_url VARCHAR(500) DEFAULT NULL,

    audio_url VARCHAR(500) DEFAULT NULL,

    is_favorite TINYINT(1) NOT NULL DEFAULT 0,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_personal_mantra_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_user (user_id),

    INDEX idx_active (is_active),

    INDEX idx_favorite (is_favorite)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;