SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS mantras (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    mantra_name VARCHAR(200) NOT NULL,

    deity_name VARCHAR(100) NOT NULL,

    sanskrit_text TEXT NOT NULL,

    transliteration TEXT NOT NULL,

    default_japa_count INT NOT NULL DEFAULT 108,

    image_url VARCHAR(500) DEFAULT NULL,

    audio_url VARCHAR(500) DEFAULT NULL,

    is_featured TINYINT(1) NOT NULL DEFAULT 0,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    display_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_active (is_active),

    INDEX idx_featured (is_featured),

    INDEX idx_order (display_order)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

INSERT INTO mantras
(mantra_name,deity_name,sanskrit_text,transliteration,default_japa_count,is_featured,is_active,display_order)
VALUES

('Om Namah Shivaya','Lord Shiva','ॐ नमः शिवाय','Om Namah Shivaya',108,1,1,1),

('Maha Mrityunjaya Mantra','Lord Shiva','ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।','Om Tryambakam Yajamahe Sugandhim Pushtivardhanam',108,1,1,2),

('Gayatri Mantra','Goddess Gayatri','ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं ।','Om Bhur Bhuvah Swaha Tat Savitur Varenyam',108,1,1,3),

('Om Namo Narayanaya','Lord Vishnu','ॐ नमो नारायणाय','Om Namo Narayanaya',108,1,1,4),

('Hare Krishna Maha Mantra','Lord Krishna','हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ।','Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare',108,1,1,5),

('Sri Rama Mantra','Lord Rama','श्री राम जय राम जय जय राम','Sri Rama Jaya Rama Jaya Jaya Rama',108,1,1,6),

('Om Gam Ganapataye Namah','Lord Ganesha','ॐ गं गणपतये नमः','Om Gam Ganapataye Namah',108,1,1,7),

('Om Shreem Mahalakshmyai Namah','Goddess Lakshmi','ॐ श्रीं महालक्ष्म्यै नमः','Om Shreem Mahalakshmyai Namah',108,1,1,8),

('Om Aim Saraswatyai Namah','Goddess Saraswati','ॐ ऐं सरस्वत्यै नमः','Om Aim Saraswatyai Namah',108,1,1,9),

('Om Shri Hanumate Namah','Lord Hanuman','ॐ श्री हनुमते नमः','Om Shri Hanumate Namah',108,1,1,10);

SET FOREIGN_KEY_CHECKS = 1;