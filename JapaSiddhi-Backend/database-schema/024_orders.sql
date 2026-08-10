SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS orders (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    order_number VARCHAR(50) NOT NULL,

    order_type ENUM(
        'BANA_LINGAM',
        'SPIRITUAL_PRODUCT'
    ) NOT NULL,

    order_source ENUM(
        'PURCHASE',
        'CHALLENGE',
        'ADMIN_GIFT'
    ) NOT NULL DEFAULT 'PURCHASE',

    item_name VARCHAR(255) NOT NULL,

    quantity INT UNSIGNED NOT NULL DEFAULT 1,

    payment_id BIGINT UNSIGNED DEFAULT NULL,

    payment_status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED',
        'REFUNDED'
    ) NOT NULL DEFAULT 'PENDING',

    order_status ENUM(
        'PENDING',
        'PROCESSING',
        'READY',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'PENDING',

    remarks TEXT DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_order_number (
        order_number
    ),

    CONSTRAINT fk_order_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_user (user_id),
    INDEX idx_order_number (order_number),
    INDEX idx_order_type (order_type),
    INDEX idx_order_source (order_source),
    INDEX idx_order_status (order_status),
    INDEX idx_payment_status (payment_status)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;