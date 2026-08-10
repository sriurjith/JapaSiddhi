SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS family_members (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    family_group_id BIGINT UNSIGNED NOT NULL,

    user_id BIGINT UNSIGNED NOT NULL,

    role ENUM(
        'OWNER',
        'ADMIN',
        'MEMBER'
    ) NOT NULL DEFAULT 'MEMBER',

    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    PRIMARY KEY (id),

    UNIQUE KEY uk_family_member (family_group_id, user_id),

    CONSTRAINT fk_family_member_group
        FOREIGN KEY (family_group_id)
        REFERENCES family_groups(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_family_member_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_group (family_group_id),
    INDEX idx_user (user_id),
    INDEX idx_role (role)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;