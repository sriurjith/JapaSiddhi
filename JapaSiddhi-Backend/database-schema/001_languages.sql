SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS languages (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    code VARCHAR(10) NOT NULL,

    locale VARCHAR(20) NOT NULL,

    name VARCHAR(100) NOT NULL,

    native_name VARCHAR(100) NOT NULL,

    direction ENUM(
        'LTR',
        'RTL'
    ) NOT NULL DEFAULT 'LTR',

    flag_emoji VARCHAR(20) DEFAULT NULL,

    google_translate_code VARCHAR(20) NOT NULL,

    is_default TINYINT(1) NOT NULL DEFAULT 0,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    display_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_language_code (code),

    UNIQUE KEY uk_language_locale (locale),
UNIQUE KEY uk_google_translate_code (google_translate_code),
    INDEX idx_language_active (is_active),

    INDEX idx_language_default (is_default),

    INDEX idx_language_order (display_order)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

INSERT INTO languages
(code,locale,name,native_name,direction,flag_emoji,google_translate_code,is_default,is_active,display_order)
VALUES

('en','en-US','English','English','LTR','🇺🇸','en',1,1,1),

('te','te-IN','Telugu','తెలుగు','LTR','🇮🇳','te',0,1,2),

('hi','hi-IN','Hindi','हिन्दी','LTR','🇮🇳','hi',0,1,3),

('ta','ta-IN','Tamil','தமிழ்','LTR','🇮🇳','ta',0,1,4),

('kn','kn-IN','Kannada','ಕನ್ನಡ','LTR','🇮🇳','kn',0,1,5),

('ml','ml-IN','Malayalam','മലയാളം','LTR','🇮🇳','ml',0,1,6),

('mr','mr-IN','Marathi','मराठी','LTR','🇮🇳','mr',0,1,7),

('gu','gu-IN','Gujarati','ગુજરાતી','LTR','🇮🇳','gu',0,1,8),

('bn','bn-IN','Bengali','বাংলা','LTR','🇮🇳','bn',0,1,9),

('pa','pa-IN','Punjabi','ਪੰਜਾਬੀ','LTR','🇮🇳','pa',0,1,10),

('or','or-IN','Odia','ଓଡ଼ିଆ','LTR','🇮🇳','or',0,1,11),

('as','as-IN','Assamese','অসমীয়া','LTR','🇮🇳','as',0,1,12),

('ur','ur-PK','Urdu','اردو','RTL','🇵🇰','ur',0,1,13),

('ar','ar-SA','Arabic','العربية','RTL','🇸🇦','ar',0,1,14),

('ne','ne-NP','Nepali','नेपाली','LTR','🇳🇵','ne',0,1,15),

('si','si-LK','Sinhala','සිංහල','LTR','🇱🇰','si',0,1,16),

('th','th-TH','Thai','ไทย','LTR','🇹🇭','th',0,1,17),

('id','id-ID','Indonesian','Bahasa Indonesia','LTR','🇮🇩','id',0,1,18),

('ms','ms-MY','Malay','Bahasa Melayu','LTR','🇲🇾','ms',0,1,19),

('vi','vi-VN','Vietnamese','Tiếng Việt','LTR','🇻🇳','vi',0,1,20),
('zh','zh-CN','Chinese (Simplified)','简体中文','LTR','🇨🇳','zh-CN',0,1,21),

('zh-TW','zh-TW','Chinese (Traditional)','繁體中文','LTR','🇹🇼','zh-TW',0,1,22),

('ja','ja-JP','Japanese','日本語','LTR','🇯🇵','ja',0,1,23),

('ko','ko-KR','Korean','한국어','LTR','🇰🇷','ko',0,1,24),

('ru','ru-RU','Russian','Русский','LTR','🇷🇺','ru',0,1,25),

('uk','uk-UA','Ukrainian','Українська','LTR','🇺🇦','uk',0,1,26),

('de','de-DE','German','Deutsch','LTR','🇩🇪','de',0,1,27),

('fr','fr-FR','French','Français','LTR','🇫🇷','fr',0,1,28),

('es','es-ES','Spanish','Español','LTR','🇪🇸','es',0,1,29),

('pt','pt-PT','Portuguese','Português','LTR','🇵🇹','pt',0,1,30),

('it','it-IT','Italian','Italiano','LTR','🇮🇹','it',0,1,31),

('nl','nl-NL','Dutch','Nederlands','LTR','🇳🇱','nl',0,1,32),

('pl','pl-PL','Polish','Polski','LTR','🇵🇱','pl',0,1,33),

('tr','tr-TR','Turkish','Türkçe','LTR','🇹🇷','tr',0,1,34),

('el','el-GR','Greek','Ελληνικά','LTR','🇬🇷','el',0,1,35),

('he','he-IL','Hebrew','עברית','RTL','🇮🇱','he',0,1,36),

('fa','fa-IR','Persian','فارسی','RTL','🇮🇷','fa',0,1,37),

('sw','sw-KE','Swahili','Kiswahili','LTR','🇰🇪','sw',0,1,38),

('am','am-ET','Amharic','አማርኛ','LTR','🇪🇹','am',0,1,39),

('fil','fil-PH','Filipino','Filipino','LTR','🇵🇭','fil',0,1,40),
('my','my-MM','Myanmar','မြန်မာ','LTR','🇲🇲','my',0,1,41),

('km','km-KH','Khmer','ខ្មែរ','LTR','🇰🇭','km',0,1,42),

('lo','lo-LA','Lao','ລາວ','LTR','🇱🇦','lo',0,1,43),

('mn','mn-MN','Mongolian','Монгол','LTR','🇲🇳','mn',0,1,44),

('uz','uz-UZ','Uzbek','Oʻzbek','LTR','🇺🇿','uz',0,1,45),

('kk','kk-KZ','Kazakh','Қазақ','LTR','🇰🇿','kk',0,1,46),

('ky','ky-KG','Kyrgyz','Кыргызча','LTR','🇰🇬','ky',0,1,47),

('tg','tg-TJ','Tajik','Тоҷикӣ','LTR','🇹🇯','tg',0,1,48),

('af','af-ZA','Afrikaans','Afrikaans','LTR','🇿🇦','af',0,1,49),

('is','is-IS','Icelandic','Íslenska','LTR','🇮🇸','is',0,1,50),

('ga','ga-IE','Irish','Gaeilge','LTR','🇮🇪','ga',0,1,51),

('cy','cy-GB','Welsh','Cymraeg','LTR','🇬🇧','cy',0,1,52),

('cs','cs-CZ','Czech','Čeština','LTR','🇨🇿','cs',0,1,53),

('sk','sk-SK','Slovak','Slovenčina','LTR','🇸🇰','sk',0,1,54),

('hu','hu-HU','Hungarian','Magyar','LTR','🇭🇺','hu',0,1,55),

('ro','ro-RO','Romanian','Română','LTR','🇷🇴','ro',0,1,56),

('bg','bg-BG','Bulgarian','Български','LTR','🇧🇬','bg',0,1,57),

('hr','hr-HR','Croatian','Hrvatski','LTR','🇭🇷','hr',0,1,58),

('sr','sr-RS','Serbian','Српски','LTR','🇷🇸','sr',0,1,59),

('sl','sl-SI','Slovenian','Slovenščina','LTR','🇸🇮','sl',0,1,60),
('bs','bs-BA','Bosnian','Bosanski','LTR','🇧🇦','bs',0,1,61),

('mk','mk-MK','Macedonian','Македонски','LTR','🇲🇰','mk',0,1,62),

('sq','sq-AL','Albanian','Shqip','LTR','🇦🇱','sq',0,1,63),

('et','et-EE','Estonian','Eesti','LTR','🇪🇪','et',0,1,64),

('lv','lv-LV','Latvian','Latviešu','LTR','🇱🇻','lv',0,1,65),

('lt','lt-LT','Lithuanian','Lietuvių','LTR','🇱🇹','lt',0,1,66),

('fi','fi-FI','Finnish','Suomi','LTR','🇫🇮','fi',0,1,67),

('sv','sv-SE','Swedish','Svenska','LTR','🇸🇪','sv',0,1,68),

('nb','nb-NO','Norwegian Bokmål','Norsk Bokmål','LTR','🇳🇴','nb',0,1,69),

('da','da-DK','Danish','Dansk','LTR','🇩🇰','da',0,1,70),

('mt','mt-MT','Maltese','Malti','LTR','🇲🇹','mt',0,1,71),

('eu','eu-ES','Basque','Euskara','LTR','🇪🇸','eu',0,1,72),

('gl','gl-ES','Galician','Galego','LTR','🇪🇸','gl',0,1,73),

('ca','ca-ES','Catalan','Català','LTR','🇪🇸','ca',0,1,74),

('lb','lb-LU','Luxembourgish','Lëtzebuergesch','LTR','🇱🇺','lb',0,1,75),

('yi','yi','Yiddish','ייִדיש','RTL','🇮🇱','yi',0,1,76),

('ps','ps-AF','Pashto','پښتو','RTL','🇦🇫','ps',0,1,77),

('ku','ku','Kurdish (Kurmanji)','Kurdî','LTR','🌍','ku',0,1,78),

('sd','sd-PK','Sindhi','سنڌي','RTL','🇵🇰','sd',0,1,79),

('ckb','ckb-IQ','Kurdish (Sorani)','کوردی','RTL','🇮🇶','ckb',0,1,80),
('xh','xh-ZA','Xhosa','isiXhosa','LTR','🇿🇦','xh',0,1,81),

('zu','zu-ZA','Zulu','isiZulu','LTR','🇿🇦','zu',0,1,82),

('st','st-LS','Sesotho','Sesotho','LTR','🇱🇸','st',0,1,83),

('tn','tn-BW','Setswana','Setswana','LTR','🇧🇼','tn',0,1,84),

('sn','sn-ZW','Shona','ChiShona','LTR','🇿🇼','sn',0,1,85),

('rw','rw-RW','Kinyarwanda','Kinyarwanda','LTR','🇷🇼','rw',0,1,86),

('so','so-SO','Somali','Soomaali','LTR','🇸🇴','so',0,1,87),

('ha','ha-NG','Hausa','Hausa','LTR','🇳🇬','ha',0,1,88),

('ig','ig-NG','Igbo','Igbo','LTR','🇳🇬','ig',0,1,89),

('yo','yo-NG','Yorùbá','Yorùbá','LTR','🇳🇬','yo',0,1,90),

('ak','ak-GH','Akan','Akan','LTR','🇬🇭','ak',0,1,91),

('ny','ny-MW','Chichewa','Chichewa','LTR','🇲🇼','ny',0,1,92),

('mg','mg-MG','Malagasy','Malagasy','LTR','🇲🇬','mg',0,1,93),

('fj','fj-FJ','Fijian','Vakaviti','LTR','🇫🇯','fj',0,1,94),

('sm','sm-WS','Samoan','Gagana Samoa','LTR','🇼🇸','sm',0,1,95),

('to','to-TO','Tongan','Lea Fakatonga','LTR','🇹🇴','to',0,1,96),

('mi','mi-NZ','Māori','Te Reo Māori','LTR','🇳🇿','mi',0,1,97),

('haw','haw-US','Hawaiian','ʻŌlelo Hawaiʻi','LTR','🇺🇸','haw',0,1,98),

('eo','eo','Esperanto','Esperanto','LTR','🌍','eo',0,1,99),

('la','la','Latin','Latina','LTR','🏛️','la',0,1,100);

SET FOREIGN_KEY_CHECKS = 1;