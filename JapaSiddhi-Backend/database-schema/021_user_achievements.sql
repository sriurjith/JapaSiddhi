SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS user_achievements (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    achievement_id BIGINT UNSIGNED NOT NULL,

    achieved_value BIGINT UNSIGNED NOT NULL DEFAULT 0,

    reward_claimed TINYINT(1) NOT NULL DEFAULT 0,

    remarks VARCHAR(500) DEFAULT NULL,

    earned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_user_achievement (
        user_id,
        achievement_id
    ),

    CONSTRAINT fk_user_achievement_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_user_achievement_master
        FOREIGN KEY (achievement_id)
        REFERENCES achievements(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_user (user_id),
    INDEX idx_achievement (achievement_id),
    INDEX idx_reward_claimed (reward_claimed)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;