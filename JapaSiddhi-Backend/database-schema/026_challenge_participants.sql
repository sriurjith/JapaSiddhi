SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS challenge_participants (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    challenge_id BIGINT UNSIGNED NOT NULL,

    user_id BIGINT UNSIGNED NOT NULL,

    current_value BIGINT UNSIGNED NOT NULL DEFAULT 0,

    is_completed TINYINT(1) NOT NULL DEFAULT 0,

    completed_at DATETIME DEFAULT NULL,

    reward_given TINYINT(1) NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_challenge_user (
        challenge_id,
        user_id
    ),

    CONSTRAINT fk_challenge_participant_challenge
        FOREIGN KEY (challenge_id)
        REFERENCES challenges(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_challenge_participant_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_challenge (challenge_id),
    INDEX idx_user (user_id),
    INDEX idx_completed (is_completed),
    INDEX idx_reward_given (reward_given)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;