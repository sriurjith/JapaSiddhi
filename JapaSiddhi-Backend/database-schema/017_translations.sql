SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS translations (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    language_id BIGINT UNSIGNED NOT NULL,

    translation_key VARCHAR(255) NOT NULL,

    translated_text TEXT NOT NULL,

    source_text TEXT DEFAULT NULL,

    translated_by ENUM(
        'SYSTEM',
        'ADMIN',
        'GOOGLE'
    ) NOT NULL DEFAULT 'SYSTEM',

    is_verified TINYINT(1) NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_translation (
        language_id,
        translation_key
    ),

    CONSTRAINT fk_translation_language
        FOREIGN KEY (language_id)
        REFERENCES languages(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_language (language_id),

    INDEX idx_key (translation_key),

    INDEX idx_verified (is_verified)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;