SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS achievements (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    title VARCHAR(150) NOT NULL,

    description TEXT DEFAULT NULL,

    badge_image VARCHAR(500) DEFAULT NULL,

    achievement_type ENUM(
        'JAPA_COUNT',
        'STREAK',
        'GOAL_COMPLETION',
        'VOICE_JAPA',
        'TAP_JAPA',
        'DONATION',
        'CHALLENGE',
        'SPECIAL'
    ) NOT NULL,

    target_value BIGINT UNSIGNED NOT NULL DEFAULT 0,

    display_order INT NOT NULL DEFAULT 0,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_type (achievement_type),
    INDEX idx_active (is_active)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

INSERT INTO achievements
(
    title,
    description,
    achievement_type,
    target_value,
    display_order
)
VALUES

(
    'First Chant',
    'Complete your first Japa.',
    'JAPA_COUNT',
    1,
    1
),

(
    '108 Japa',
    'Complete 108 chants.',
    'JAPA_COUNT',
    108,
    2
),

(
    '1,000 Japa',
    'Complete 1,000 chants.',
    'JAPA_COUNT',
    1000,
    3
),

(
    '10,000 Japa',
    'Complete 10,000 chants.',
    'JAPA_COUNT',
    10000,
    4
),

(
    '1 Lakh Japa',
    'Complete 100,000 chants.',
    'JAPA_COUNT',
    100000,
    5
),

(
    '7 Day Streak',
    'Chant continuously for 7 days.',
    'STREAK',
    7,
    6
),

(
    '30 Day Streak',
    'Chant continuously for 30 days.',
    'STREAK',
    30,
    7
),

(
    '108 Day Streak',
    'Chant continuously for 108 days.',
    'STREAK',
    108,
    8
),

(
    '365 Day Streak',
    'Maintain Japa for one full year.',
    'STREAK',
    365,
    9
),

(
    'First Goal Completed',
    'Complete your first Japa Goal.',
    'GOAL_COMPLETION',
    1,
    10
),

(
    '10 Goals Completed',
    'Complete 10 Japa Goals.',
    'GOAL_COMPLETION',
    10,
    11
),

(
    'Voice Japa Beginner',
    'Complete 100 Voice Japa chants.',
    'VOICE_JAPA',
    100,
    12
),

(
    'Voice Japa Master',
    'Complete 10,000 Voice Japa chants.',
    'VOICE_JAPA',
    10000,
    13
),

(
    'Tap Japa Beginner',
    'Complete 100 Tap Japa chants.',
    'TAP_JAPA',
    100,
    14
),

(
    'Tap Japa Master',
    'Complete 10,000 Tap Japa chants.',
    'TAP_JAPA',
    10000,
    15
),

(
    'Monthly Donor',
    'Complete your first monthly donation.',
    'DONATION',
    1,
    16
),

(
    'Annadanam Supporter',
    'Support Annadanam 10 times.',
    'DONATION',
    10,
    17
),

(
    'First Challenge',
    'Successfully complete your first Japa Challenge.',
    'CHALLENGE',
    1,
    18
),

(
    'Challenge Champion',
    'Successfully complete 10 Japa Challenges.',
    'CHALLENGE',
    10,
    19
),

(
    'Special Recognition',
    'Achievement awarded manually by the administrator.',
    'SPECIAL',
    1,
    20
);

SET FOREIGN_KEY_CHECKS = 1;