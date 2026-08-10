SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS japa_goals (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    mantra_type ENUM(
        'DEFAULT',
        'PERSONAL'
    ) NOT NULL,

    mantra_id BIGINT UNSIGNED DEFAULT NULL,

    personal_mantra_id BIGINT UNSIGNED DEFAULT NULL,

    goal_name VARCHAR(200) NOT NULL,

    target_count BIGINT NOT NULL,

    completed_count BIGINT NOT NULL DEFAULT 0,

    remaining_count BIGINT NOT NULL DEFAULT 0,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    daily_target INT NOT NULL,

    status ENUM(
        'ACTIVE',
        'COMPLETED',
        'PAUSED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'ACTIVE',

    notes TEXT DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_japa_goal_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_japa_goal_default_mantra
        FOREIGN KEY (mantra_id)
        REFERENCES mantras(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_japa_goal_personal_mantra
        FOREIGN KEY (personal_mantra_id)
        REFERENCES user_personal_mantras(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_start_date (start_date),
    INDEX idx_end_date (end_date)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;