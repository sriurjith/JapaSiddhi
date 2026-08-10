SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS japa_sessions (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    japa_goal_id BIGINT UNSIGNED DEFAULT NULL,

    mantra_type ENUM('DEFAULT','PERSONAL') NOT NULL,

    mantra_id BIGINT UNSIGNED DEFAULT NULL,

    personal_mantra_id BIGINT UNSIGNED DEFAULT NULL,

    chant_mode ENUM('TAP','VOICE') NOT NULL,

    session_count INT NOT NULL,

    started_at DATETIME NOT NULL,

    completed_at DATETIME NOT NULL,

    duration_seconds INT NOT NULL DEFAULT 0,

    remarks VARCHAR(500) DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_session_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_session_goal
        FOREIGN KEY (japa_goal_id)
        REFERENCES japa_goals(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_session_mantra
        FOREIGN KEY (mantra_id)
        REFERENCES mantras(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_session_personal_mantra
        FOREIGN KEY (personal_mantra_id)
        REFERENCES user_personal_mantras(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_user (user_id),
    INDEX idx_goal (japa_goal_id),
    INDEX idx_created (created_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;