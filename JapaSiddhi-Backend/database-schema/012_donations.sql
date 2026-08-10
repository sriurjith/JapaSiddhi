SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS donations (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    donation_type ENUM(
        'GENERAL',
        'MONTHLY'
    ) NOT NULL,

    amount DECIMAL(12,2) NOT NULL,

    currency VARCHAR(10) NOT NULL DEFAULT 'INR',

    payment_method VARCHAR(50) DEFAULT NULL,

    transaction_id VARCHAR(200) DEFAULT NULL,

    payment_status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED',
        'REFUNDED'
    ) NOT NULL DEFAULT 'PENDING',

    donated_at DATETIME DEFAULT NULL,

    remarks VARCHAR(500) DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_donation_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_user (user_id),
    INDEX idx_type (donation_type),
    INDEX idx_status (payment_status),
    INDEX idx_date (donated_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;