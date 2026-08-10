SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS monthly_donations (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    donation_id BIGINT UNSIGNED DEFAULT NULL,

    donation_month TINYINT NOT NULL,

    donation_year SMALLINT NOT NULL,

    amount DECIMAL(12,2) NOT NULL,

    payment_status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED'
    ) NOT NULL DEFAULT 'PENDING',

    paid_on DATETIME DEFAULT NULL,

    reminder_sent TINYINT(1) NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_monthly_donation (
        user_id,
        donation_month,
        donation_year
    ),

    CONSTRAINT fk_monthly_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_monthly_donation
        FOREIGN KEY (donation_id)
        REFERENCES donations(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_month (donation_month),
    INDEX idx_year (donation_year),
    INDEX idx_status (payment_status)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;