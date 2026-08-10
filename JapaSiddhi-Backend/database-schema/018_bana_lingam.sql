SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS bana_lingam_requests (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    order_id BIGINT UNSIGNED DEFAULT NULL,

    full_name VARCHAR(200) NOT NULL,

    mobile_number VARCHAR(20) NOT NULL,

    email VARCHAR(255) DEFAULT NULL,

    gothram VARCHAR(150) DEFAULT NULL,

    nakshatram VARCHAR(150) DEFAULT NULL,

    address_line1 VARCHAR(255) NOT NULL,

    address_line2 VARCHAR(255) DEFAULT NULL,

    city VARCHAR(150) NOT NULL,

    state VARCHAR(150) NOT NULL,

    country_id BIGINT UNSIGNED NOT NULL,

    postal_code VARCHAR(20) NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    remarks TEXT DEFAULT NULL,

    request_status ENUM(
        'PENDING',
        'APPROVED',
        'REJECTED',
        'COMPLETED'
    ) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_bana_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_bana_country
        FOREIGN KEY (country_id)
        REFERENCES countries(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_bana_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_user (user_id),
    INDEX idx_order (order_id),
    INDEX idx_status (request_status),
    INDEX idx_country (country_id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;