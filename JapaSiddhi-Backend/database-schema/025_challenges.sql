SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS challenges (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    title VARCHAR(200) NOT NULL,

    description TEXT DEFAULT NULL,

    challenge_type ENUM(
        'JAPA_COUNT',
        'VOICE_JAPA',
        'TAP_JAPA',
        'STREAK',
        'SPECIAL'
    ) NOT NULL,

    target_value BIGINT UNSIGNED NOT NULL,

    reward_type ENUM(
        'CERTIFICATE',
        'RUDRAKSHA',
        'BANA_LINGAM',
        'SPIRITUAL_PRODUCT',
        'OTHER'
    ) NOT NULL,

    reward_name VARCHAR(200) NOT NULL,

    reward_quantity INT UNSIGNED NOT NULL DEFAULT 1,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_type (challenge_type),
    INDEX idx_active (is_active),
    INDEX idx_dates (start_date, end_date)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;