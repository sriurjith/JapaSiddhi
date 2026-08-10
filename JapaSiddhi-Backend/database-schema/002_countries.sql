SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS countries (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    iso2 CHAR(2) NOT NULL,
    iso3 CHAR(3) NOT NULL,
    numeric_code SMALLINT UNSIGNED DEFAULT NULL,
    phone_code VARCHAR(10) NOT NULL,
    currency_code VARCHAR(10) DEFAULT NULL,
    currency_name VARCHAR(100) DEFAULT NULL,
    currency_symbol VARCHAR(20) DEFAULT NULL,
    name VARCHAR(150) NOT NULL,
    native_name VARCHAR(150) DEFAULT NULL,
    nationality VARCHAR(150) DEFAULT NULL,
    emoji VARCHAR(20) DEFAULT NULL,
    emoji_unicode VARCHAR(50) DEFAULT NULL,
    capital VARCHAR(150) DEFAULT NULL,
    continent VARCHAR(100) DEFAULT NULL,
    subregion VARCHAR(150) DEFAULT NULL,
    latitude DECIMAL(10,8) DEFAULT NULL,
    longitude DECIMAL(11,8) DEFAULT NULL,
    timezone VARCHAR(100) DEFAULT NULL,
    is_default TINYINT(1) NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uk_country_iso2 (iso2),
    UNIQUE KEY uk_country_iso3 (iso3),
    UNIQUE KEY uk_country_name (name),
    INDEX idx_country_name (name),
    INDEX idx_country_phone (phone_code),
    INDEX idx_country_continent (continent),
    INDEX idx_country_active (is_active)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO countries
(
iso2,
iso3,
numeric_code,
phone_code,
currency_code,
currency_name,
currency_symbol,
name,
native_name,
nationality,
emoji,
capital,
continent,
is_default,
is_active,
display_order
)
VALUES
('IN','IND',356,'91','INR','Indian Rupee','₹','India','भारत','Indian','🇮🇳','New Delhi','Asia',1,1,1),

('US','USA',840,'1','USD','US Dollar','$','United States','United States','American','🇺🇸','Washington, D.C.','North America',0,1,2),

('CA','CAN',124,'1','CAD','Canadian Dollar','$','Canada','Canada','Canadian','🇨🇦','Ottawa','North America',0,1,3),

('GB','GBR',826,'44','GBP','Pound Sterling','£','United Kingdom','United Kingdom','British','🇬🇧','London','Europe',0,1,4),

('AU','AUS',36,'61','AUD','Australian Dollar','$','Australia','Australia','Australian','🇦🇺','Canberra','Oceania',0,1,5),
('NZ','NZL',554,'64','NZD','New Zealand Dollar','$','New Zealand','New Zealand','New Zealander','🇳🇿','Wellington','Oceania',0,1,6),

('AE','ARE',784,'971','AED','UAE Dirham','د.إ','United Arab Emirates','الإمارات العربية المتحدة','Emirati','🇦🇪','Abu Dhabi','Asia',0,1,7),

('SA','SAU',682,'966','SAR','Saudi Riyal','﷼','Saudi Arabia','المملكة العربية السعودية','Saudi','🇸🇦','Riyadh','Asia',0,1,8),

('SG','SGP',702,'65','SGD','Singapore Dollar','$','Singapore','Singapore','Singaporean','🇸🇬','Singapore','Asia',0,1,9),

('MY','MYS',458,'60','MYR','Malaysian Ringgit','RM','Malaysia','Malaysia','Malaysian','🇲🇾','Kuala Lumpur','Asia',0,1,10),
('LK','LKA',144,'94','LKR','Sri Lankan Rupee','Rs','Sri Lanka','ශ්‍රී ලංකාව','Sri Lankan','🇱🇰','Sri Jayawardenepura Kotte','Asia',0,1,11),

('NP','NPL',524,'977','NPR','Nepalese Rupee','रु','Nepal','नेपाल','Nepalese','🇳🇵','Kathmandu','Asia',0,1,12),

('BD','BGD',50,'880','BDT','Bangladeshi Taka','৳','Bangladesh','বাংলাদেশ','Bangladeshi','🇧🇩','Dhaka','Asia',0,1,13),

('BT','BTN',64,'975','BTN','Bhutanese Ngultrum','Nu.','Bhutan','འབྲུག','Bhutanese','🇧🇹','Thimphu','Asia',0,1,14),

('PK','PAK',586,'92','PKR','Pakistani Rupee','₨','Pakistan','پاکستان','Pakistani','🇵🇰','Islamabad','Asia',0,1,15),
('AF','AFG',4,'93','AFN','Afghan Afghani','؋','Afghanistan','افغانستان','Afghan','🇦🇫','Kabul','Asia',0,1,16),

('CN','CHN',156,'86','CNY','Chinese Yuan','¥','China','中国','Chinese','🇨🇳','Beijing','Asia',0,1,17),

('JP','JPN',392,'81','JPY','Japanese Yen','¥','Japan','日本','Japanese','🇯🇵','Tokyo','Asia',0,1,18),

('KR','KOR',410,'82','KRW','South Korean Won','₩','South Korea','대한민국','South Korean','🇰🇷','Seoul','Asia',0,1,19),

('TH','THA',764,'66','THB','Thai Baht','฿','Thailand','ประเทศไทย','Thai','🇹🇭','Bangkok','Asia',0,1,20),

('VN','VNM',704,'84','VND','Vietnamese Dong','₫','Vietnam','Việt Nam','Vietnamese','🇻🇳','Hanoi','Asia',0,1,21),

('ID','IDN',360,'62','IDR','Indonesian Rupiah','Rp','Indonesia','Indonesia','Indonesian','🇮🇩','Jakarta','Asia',0,1,22),

('PH','PHL',608,'63','PHP','Philippine Peso','₱','Philippines','Pilipinas','Filipino','🇵🇭','Manila','Asia',0,1,23),

('MM','MMR',104,'95','MMK','Myanmar Kyat','Ks','Myanmar','မြန်မာ','Myanmar','🇲🇲','Naypyidaw','Asia',0,1,24),

('KH','KHM',116,'855','KHR','Cambodian Riel','៛','Cambodia','កម្ពុជា','Cambodian','🇰🇭','Phnom Penh','Asia',0,1,25),

('LA','LAO',418,'856','LAK','Lao Kip','₭','Laos','ລາວ','Lao','🇱🇦','Vientiane','Asia',0,1,26),

('MN','MNG',496,'976','MNT','Mongolian Tögrög','₮','Mongolia','Монгол','Mongolian','🇲🇳','Ulaanbaatar','Asia',0,1,27),

('TW','TWN',158,'886','TWD','New Taiwan Dollar','NT$','Taiwan','臺灣','Taiwanese','🇹🇼','Taipei','Asia',0,1,28),

('HK','HKG',344,'852','HKD','Hong Kong Dollar','HK$','Hong Kong','香港','Hong Konger','🇭🇰','Hong Kong','Asia',0,1,29),

('MO','MAC',446,'853','MOP','Macanese Pataca','MOP$','Macao','澳門','Macanese','🇲🇴','Macao','Asia',0,1,30),

('MV','MDV',462,'960','MVR','Maldivian Rufiyaa','Rf','Maldives','Maldives','Maldivian','🇲🇻','Malé','Asia',0,1,31),

('BN','BRN',96,'673','BND','Brunei Dollar','$','Brunei','Negara Brunei Darussalam','Bruneian','🇧🇳','Bandar Seri Begawan','Asia',0,1,32),

('TL','TLS',626,'670','USD','US Dollar','$','Timor-Leste','Timor-Leste','Timorese','🇹🇱','Dili','Asia',0,1,33),

('TR','TUR',792,'90','TRY','Turkish Lira','₺','Türkiye','Türkiye','Turkish','🇹🇷','Ankara','Asia',0,1,34),

('IL','ISR',376,'972','ILS','Israeli New Shekel','₪','Israel','ישראל','Israeli','🇮🇱','Jerusalem','Asia',0,1,35),
('QA','QAT',634,'974','QAR','Qatari Riyal','﷼','Qatar','قطر','Qatari','🇶🇦','Doha','Asia',0,1,36),

('KW','KWT',414,'965','KWD','Kuwaiti Dinar','د.ك','Kuwait','الكويت','Kuwaiti','🇰🇼','Kuwait City','Asia',0,1,37),

('OM','OMN',512,'968','OMR','Omani Rial','ر.ع.','Oman','عُمان','Omani','🇴🇲','Muscat','Asia',0,1,38),

('BH','BHR',48,'973','BHD','Bahraini Dinar','ب.د','Bahrain','البحرين','Bahraini','🇧🇭','Manama','Asia',0,1,39),

('JO','JOR',400,'962','JOD','Jordanian Dinar','د.ا','Jordan','الأردن','Jordanian','🇯🇴','Amman','Asia',0,1,40),

('LB','LBN',422,'961','LBP','Lebanese Pound','ل.ل','Lebanon','لبنان','Lebanese','🇱🇧','Beirut','Asia',0,1,41),

('IQ','IRQ',368,'964','IQD','Iraqi Dinar','ع.د','Iraq','العراق','Iraqi','🇮🇶','Baghdad','Asia',0,1,42),

('IR','IRN',364,'98','IRR','Iranian Rial','﷼','Iran','ایران','Iranian','🇮🇷','Tehran','Asia',0,1,43),

('SY','SYR',760,'963','SYP','Syrian Pound','£','Syria','سوريا','Syrian','🇸🇾','Damascus','Asia',0,1,44),

('YE','YEM',887,'967','YER','Yemeni Rial','﷼','Yemen','اليمن','Yemeni','🇾🇪','Sana''a','Asia',0,1,45),

('GE','GEO',268,'995','GEL','Georgian Lari','₾','Georgia','საქართველო','Georgian','🇬🇪','Tbilisi','Asia',0,1,46),

('AM','ARM',51,'374','AMD','Armenian Dram','֏','Armenia','Հայաստան','Armenian','🇦🇲','Yerevan','Asia',0,1,47),

('AZ','AZE',31,'994','AZN','Azerbaijani Manat','₼','Azerbaijan','Azərbaycan','Azerbaijani','🇦🇿','Baku','Asia',0,1,48),

('CY','CYP',196,'357','EUR','Euro','€','Cyprus','Κύπρος','Cypriot','🇨🇾','Nicosia','Europe',0,1,49),

('RU','RUS',643,'7','RUB','Russian Ruble','₽','Russia','Россия','Russian','🇷🇺','Moscow','Europe',0,1,50),

('UA','UKR',804,'380','UAH','Ukrainian Hryvnia','₴','Ukraine','Україна','Ukrainian','🇺🇦','Kyiv','Europe',0,1,51),

('BY','BLR',112,'375','BYN','Belarusian Ruble','Br','Belarus','Беларусь','Belarusian','🇧🇾','Minsk','Europe',0,1,52),

('MD','MDA',498,'373','MDL','Moldovan Leu','L','Moldova','Moldova','Moldovan','🇲🇩','Chișinău','Europe',0,1,53),

('PL','POL',616,'48','PLN','Polish Złoty','zł','Poland','Polska','Polish','🇵🇱','Warsaw','Europe',0,1,54),

('DE','DEU',276,'49','EUR','Euro','€','Germany','Deutschland','German','🇩🇪','Berlin','Europe',0,1,55),
('FR','FRA',250,'33','EUR','Euro','€','France','France','French','🇫🇷','Paris','Europe',0,1,56),

('IT','ITA',380,'39','EUR','Euro','€','Italy','Italia','Italian','🇮🇹','Rome','Europe',0,1,57),

('ES','ESP',724,'34','EUR','Euro','€','Spain','España','Spanish','🇪🇸','Madrid','Europe',0,1,58),

('PT','PRT',620,'351','EUR','Euro','€','Portugal','Portugal','Portuguese','🇵🇹','Lisbon','Europe',0,1,59),

('NL','NLD',528,'31','EUR','Euro','€','Netherlands','Nederland','Dutch','🇳🇱','Amsterdam','Europe',0,1,60),

('BE','BEL',56,'32','EUR','Euro','€','Belgium','België','Belgian','🇧🇪','Brussels','Europe',0,1,61),

('LU','LUX',442,'352','EUR','Euro','€','Luxembourg','Lëtzebuerg','Luxembourger','🇱🇺','Luxembourg','Europe',0,1,62),

('IE','IRL',372,'353','EUR','Euro','€','Ireland','Éire','Irish','🇮🇪','Dublin','Europe',0,1,63),

('CH','CHE',756,'41','CHF','Swiss Franc','CHF','Switzerland','Schweiz','Swiss','🇨🇭','Bern','Europe',0,1,64),

('AT','AUT',40,'43','EUR','Euro','€','Austria','Österreich','Austrian','🇦🇹','Vienna','Europe',0,1,65),

('CZ','CZE',203,'420','CZK','Czech Koruna','Kč','Czech Republic','Česká republika','Czech','🇨🇿','Prague','Europe',0,1,66),

('SK','SVK',703,'421','EUR','Euro','€','Slovakia','Slovensko','Slovak','🇸🇰','Bratislava','Europe',0,1,67),

('HU','HUN',348,'36','HUF','Forint','Ft','Hungary','Magyarország','Hungarian','🇭🇺','Budapest','Europe',0,1,68),

('RO','ROU',642,'40','RON','Romanian Leu','L','Romania','România','Romanian','🇷🇴','Bucharest','Europe',0,1,69),

('BG','BGR',100,'359','BGN','Bulgarian Lev','лв','Bulgaria','България','Bulgarian','🇧🇬','Sofia','Europe',0,1,70),

('GR','GRC',300,'30','EUR','Euro','€','Greece','Ελλάδα','Greek','🇬🇷','Athens','Europe',0,1,71),

('DK','DNK',208,'45','DKK','Danish Krone','kr','Denmark','Danmark','Danish','🇩🇰','Copenhagen','Europe',0,1,72),

('SE','SWE',752,'46','SEK','Swedish Krona','kr','Sweden','Sverige','Swedish','🇸🇪','Stockholm','Europe',0,1,73),

('NO','NOR',578,'47','NOK','Norwegian Krone','kr','Norway','Norge','Norwegian','🇳🇴','Oslo','Europe',0,1,74),

('FI','FIN',246,'358','EUR','Euro','€','Finland','Suomi','Finnish','🇫🇮','Helsinki','Europe',0,1,75),
('IS','ISL',352,'354','ISK','Icelandic Króna','kr','Iceland','Ísland','Icelander','🇮🇸','Reykjavík','Europe',0,1,76),

('EE','EST',233,'372','EUR','Euro','€','Estonia','Eesti','Estonian','🇪🇪','Tallinn','Europe',0,1,77),

('LV','LVA',428,'371','EUR','Euro','€','Latvia','Latvija','Latvian','🇱🇻','Riga','Europe',0,1,78),

('LT','LTU',440,'370','EUR','Euro','€','Lithuania','Lietuva','Lithuanian','🇱🇹','Vilnius','Europe',0,1,79),

('SI','SVN',705,'386','EUR','Euro','€','Slovenia','Slovenija','Slovene','🇸🇮','Ljubljana','Europe',0,1,80),

('HR','HRV',191,'385','EUR','Euro','€','Croatia','Hrvatska','Croatian','🇭🇷','Zagreb','Europe',0,1,81),

('BA','BIH',70,'387','BAM','Convertible Mark','KM','Bosnia and Herzegovina','Bosna i Hercegovina','Bosnian','🇧🇦','Sarajevo','Europe',0,1,82),

('RS','SRB',688,'381','RSD','Serbian Dinar','дин','Serbia','Србија','Serbian','🇷🇸','Belgrade','Europe',0,1,83),

('ME','MNE',499,'382','EUR','Euro','€','Montenegro','Crna Gora','Montenegrin','🇲🇪','Podgorica','Europe',0,1,84),

('MK','MKD',807,'389','MKD','Macedonian Denar','ден','North Macedonia','Северна Македонија','Macedonian','🇲🇰','Skopje','Europe',0,1,85),

('AL','ALB',8,'355','ALL','Albanian Lek','L','Albania','Shqipëria','Albanian','🇦🇱','Tirana','Europe',0,1,86),

('XK','XKX',383,'383','EUR','Euro','€','Kosovo','Kosova','Kosovar','🇽🇰','Pristina','Europe',0,1,87),

('MT','MLT',470,'356','EUR','Euro','€','Malta','Malta','Maltese','🇲🇹','Valletta','Europe',0,1,88),

('AD','AND',20,'376','EUR','Euro','€','Andorra','Andorra','Andorran','🇦🇩','Andorra la Vella','Europe',0,1,89),

('MC','MCO',492,'377','EUR','Euro','€','Monaco','Monaco','Monégasque','🇲🇨','Monaco','Europe',0,1,90),

('SM','SMR',674,'378','EUR','Euro','€','San Marino','San Marino','Sammarinese','🇸🇲','San Marino','Europe',0,1,91),

('VA','VAT',336,'379','EUR','Euro','€','Vatican City','Città del Vaticano','Vatican','🇻🇦','Vatican City','Europe',0,1,92),

('LI','LIE',438,'423','CHF','Swiss Franc','CHF','Liechtenstein','Liechtenstein','Liechtensteiner','🇱🇮','Vaduz','Europe',0,1,93),

('FO','FRO',234,'298','DKK','Danish Krone','kr','Faroe Islands','Føroyar','Faroese','🇫🇴','Tórshavn','Europe',0,1,94),

('GI','GIB',292,'350','GIP','Gibraltar Pound','£','Gibraltar','Gibraltar','Gibraltarian','🇬🇮','Gibraltar','Europe',0,1,95),
('GL','GRL',304,'299','DKK','Danish Krone','kr','Greenland','Kalaallit Nunaat','Greenlander','🇬🇱','Nuuk','North America',0,1,96),

('BM','BMU',60,'1','BMD','Bermudian Dollar','$','Bermuda','Bermuda','Bermudian','🇧🇲','Hamilton','North America',0,1,97),

('MX','MEX',484,'52','MXN','Mexican Peso','$','Mexico','México','Mexican','🇲🇽','Mexico City','North America',0,1,98),

('BZ','BLZ',84,'501','BZD','Belize Dollar','$','Belize','Belize','Belizean','🇧🇿','Belmopan','North America',0,1,99),

('GT','GTM',320,'502','GTQ','Guatemalan Quetzal','Q','Guatemala','Guatemala','Guatemalan','🇬🇹','Guatemala City','North America',0,1,100),

('SV','SLV',222,'503','USD','US Dollar','$','El Salvador','El Salvador','Salvadoran','🇸🇻','San Salvador','North America',0,1,101),

('HN','HND',340,'504','HNL','Honduran Lempira','L','Honduras','Honduras','Honduran','🇭🇳','Tegucigalpa','North America',0,1,102),

('NI','NIC',558,'505','NIO','Nicaraguan Córdoba','C$','Nicaragua','Nicaragua','Nicaraguan','🇳🇮','Managua','North America',0,1,103),

('CR','CRI',188,'506','CRC','Costa Rican Colón','₡','Costa Rica','Costa Rica','Costa Rican','🇨🇷','San José','North America',0,1,104),

('PA','PAN',591,'507','PAB','Panamanian Balboa','B/.','Panama','Panamá','Panamanian','🇵🇦','Panama City','North America',0,1,105),

('BS','BHS',44,'1','BSD','Bahamian Dollar','$','Bahamas','Bahamas','Bahamian','🇧🇸','Nassau','North America',0,1,106),

('CU','CUB',192,'53','CUP','Cuban Peso','$','Cuba','Cuba','Cuban','🇨🇺','Havana','North America',0,1,107),

('JM','JAM',388,'1','JMD','Jamaican Dollar','$','Jamaica','Jamaica','Jamaican','🇯🇲','Kingston','North America',0,1,108),

('HT','HTI',332,'509','HTG','Haitian Gourde','G','Haiti','Haïti','Haitian','🇭🇹','Port-au-Prince','North America',0,1,109),

('DO','DOM',214,'1','DOP','Dominican Peso','RD$','Dominican Republic','República Dominicana','Dominican','🇩🇴','Santo Domingo','North America',0,1,110),

('BB','BRB',52,'1','BBD','Barbadian Dollar','$','Barbados','Barbados','Barbadian','🇧🇧','Bridgetown','North America',0,1,111),

('TT','TTO',780,'1','TTD','Trinidad and Tobago Dollar','TT$','Trinidad and Tobago','Trinidad and Tobago','Trinidadian','🇹🇹','Port of Spain','North America',0,1,112),

('GD','GRD',308,'1','XCD','East Caribbean Dollar','$','Grenada','Grenada','Grenadian','🇬🇩','St. George''s','North America',0,1,113),

('LC','LCA',662,'1','XCD','East Caribbean Dollar','$','Saint Lucia','Saint Lucia','Saint Lucian','🇱🇨','Castries','North America',0,1,114),

('VC','VCT',670,'1','XCD','East Caribbean Dollar','$','Saint Vincent and the Grenadines','Saint Vincent and the Grenadines','Vincentian','🇻🇨','Kingstown','North America',0,1,115),

('AG','ATG',28,'1','XCD','East Caribbean Dollar','$','Antigua and Barbuda','Antigua and Barbuda','Antiguan','🇦🇬','Saint John''s','North America',0,1,116),

('DM','DMA',212,'1','XCD','East Caribbean Dollar','$','Dominica','Dominica','Dominican','🇩🇲','Roseau','North America',0,1,117),

('KN','KNA',659,'1','XCD','East Caribbean Dollar','$','Saint Kitts and Nevis','Saint Kitts and Nevis','Kittitian and Nevisian','🇰🇳','Basseterre','North America',0,1,118),

('AR','ARG',32,'54','ARS','Argentine Peso','$','Argentina','Argentina','Argentine','🇦🇷','Buenos Aires','South America',0,1,119),

('BR','BRA',76,'55','BRL','Brazilian Real','R$','Brazil','Brasil','Brazilian','🇧🇷','Brasília','South America',0,1,120),

('CL','CHL',152,'56','CLP','Chilean Peso','$','Chile','Chile','Chilean','🇨🇱','Santiago','South America',0,1,121),

('PE','PER',604,'51','PEN','Peruvian Sol','S/','Peru','Perú','Peruvian','🇵🇪','Lima','South America',0,1,122),

('CO','COL',170,'57','COP','Colombian Peso','$','Colombia','Colombia','Colombian','🇨🇴','Bogotá','South America',0,1,123),

('VE','VEN',862,'58','VES','Venezuelan Bolívar','Bs.','Venezuela','Venezuela','Venezuelan','🇻🇪','Caracas','South America',0,1,124),

('EC','ECU',218,'593','USD','US Dollar','$','Ecuador','Ecuador','Ecuadorian','🇪🇨','Quito','South America',0,1,125),

('BO','BOL',68,'591','BOB','Boliviano','Bs.','Bolivia','Bolivia','Bolivian','🇧🇴','Sucre','South America',0,1,126),

('PY','PRY',600,'595','PYG','Guaraní','₲','Paraguay','Paraguay','Paraguayan','🇵🇾','Asunción','South America',0,1,127),

('UY','URY',858,'598','UYU','Uruguayan Peso','$U','Uruguay','Uruguay','Uruguayan','🇺🇾','Montevideo','South America',0,1,128),

('GY','GUY',328,'592','GYD','Guyanese Dollar','$','Guyana','Guyana','Guyanese','🇬🇾','Georgetown','South America',0,1,129),

('SR','SUR',740,'597','SRD','Surinamese Dollar','$','Suriname','Suriname','Surinamese','🇸🇷','Paramaribo','South America',0,1,130),

('GF','GUF',254,'594','EUR','Euro','€','French Guiana','Guyane française','French Guianese','🇬🇫','Cayenne','South America',0,1,131),

('ZA','ZAF',710,'27','ZAR','South African Rand','R','South Africa','South Africa','South African','🇿🇦','Pretoria','Africa',0,1,132),

('EG','EGY',818,'20','EGP','Egyptian Pound','£','Egypt','مصر','Egyptian','🇪🇬','Cairo','Africa',0,1,133),

('NG','NGA',566,'234','NGN','Nigerian Naira','₦','Nigeria','Nigeria','Nigerian','🇳🇬','Abuja','Africa',0,1,134),

('KE','KEN',404,'254','KES','Kenyan Shilling','KSh','Kenya','Kenya','Kenyan','🇰🇪','Nairobi','Africa',0,1,135),

('TZ','TZA',834,'255','TZS','Tanzanian Shilling','TSh','Tanzania','Tanzania','Tanzanian','🇹🇿','Dodoma','Africa',0,1,136),
('UG','UGA',800,'256','UGX','Ugandan Shilling','USh','Uganda','Uganda','Ugandan','🇺🇬','Kampala','Africa',0,1,137),

('RW','RWA',646,'250','RWF','Rwandan Franc','FRw','Rwanda','Rwanda','Rwandan','🇷🇼','Kigali','Africa',0,1,138),

('BI','BDI',108,'257','BIF','Burundian Franc','FBu','Burundi','Burundi','Burundian','🇧🇮','Gitega','Africa',0,1,139),

('ET','ETH',231,'251','ETB','Ethiopian Birr','Br','Ethiopia','ኢትዮጵያ','Ethiopian','🇪🇹','Addis Ababa','Africa',0,1,140),

('ER','ERI',232,'291','ERN','Eritrean Nakfa','Nfk','Eritrea','ኤርትራ','Eritrean','🇪🇷','Asmara','Africa',0,1,141),

('DJ','DJI',262,'253','DJF','Djiboutian Franc','Fdj','Djibouti','Djibouti','Djiboutian','🇩🇯','Djibouti','Africa',0,1,142),

('SO','SOM',706,'252','SOS','Somali Shilling','Sh','Somalia','Soomaaliya','Somali','🇸🇴','Mogadishu','Africa',0,1,143),

('SD','SDN',729,'249','SDG','Sudanese Pound','ج.س','Sudan','السودان','Sudanese','🇸🇩','Khartoum','Africa',0,1,144),

('SS','SSD',728,'211','SSP','South Sudanese Pound','£','South Sudan','South Sudan','South Sudanese','🇸🇸','Juba','Africa',0,1,145),

('CM','CMR',120,'237','XAF','Central African CFA Franc','FCFA','Cameroon','Cameroun','Cameroonian','🇨🇲','Yaoundé','Africa',0,1,146),

('CF','CAF',140,'236','XAF','Central African CFA Franc','FCFA','Central African Republic','République centrafricaine','Central African','🇨🇫','Bangui','Africa',0,1,147),

('TD','TCD',148,'235','XAF','Central African CFA Franc','FCFA','Chad','Tchad','Chadian','🇹🇩','N''Djamena','Africa',0,1,148),

('CG','COG',178,'242','XAF','Central African CFA Franc','FCFA','Republic of the Congo','Congo','Congolese','🇨🇬','Brazzaville','Africa',0,1,149),

('CD','COD',180,'243','CDF','Congolese Franc','FC','Democratic Republic of the Congo','République démocratique du Congo','Congolese','🇨🇩','Kinshasa','Africa',0,1,150),

('GA','GAB',266,'241','XAF','Central African CFA Franc','FCFA','Gabon','Gabon','Gabonese','🇬🇦','Libreville','Africa',0,1,151),

('GQ','GNQ',226,'240','XAF','Central African CFA Franc','FCFA','Equatorial Guinea','Guinea Ecuatorial','Equatorial Guinean','🇬🇶','Malabo','Africa',0,1,152),

('AO','AGO',24,'244','AOA','Angolan Kwanza','Kz','Angola','Angola','Angolan','🇦🇴','Luanda','Africa',0,1,153),

('ZM','ZMB',894,'260','ZMW','Zambian Kwacha','ZK','Zambia','Zambia','Zambian','🇿🇲','Lusaka','Africa',0,1,154),

('ZW','ZWE',716,'263','ZWG','Zimbabwe Gold','ZiG','Zimbabwe','Zimbabwe','Zimbabwean','🇿🇼','Harare','Africa',0,1,155),

('BW','BWA',72,'267','BWP','Botswana Pula','P','Botswana','Botswana','Motswana','🇧🇼','Gaborone','Africa',0,1,156),

('NA','NAM',516,'264','NAD','Namibian Dollar','$','Namibia','Namibia','Namibian','🇳🇦','Windhoek','Africa',0,1,157),

('MZ','MOZ',508,'258','MZN','Mozambican Metical','MT','Mozambique','Moçambique','Mozambican','🇲🇿','Maputo','Africa',0,1,158),

('MG','MDG',450,'261','MGA','Malagasy Ariary','Ar','Madagascar','Madagasikara','Malagasy','🇲🇬','Antananarivo','Africa',0,1,159),

('MU','MUS',480,'230','MUR','Mauritian Rupee','₨','Mauritius','Maurice','Mauritian','🇲🇺','Port Louis','Africa',0,1,160),

('SC','SYC',690,'248','SCR','Seychellois Rupee','₨','Seychelles','Seychelles','Seychellois','🇸🇨','Victoria','Africa',0,1,161),

('KM','COM',174,'269','KMF','Comorian Franc','CF','Comoros','Komori','Comorian','🇰🇲','Moroni','Africa',0,1,162),

('MW','MWI',454,'265','MWK','Malawian Kwacha','MK','Malawi','Malawi','Malawian','🇲🇼','Lilongwe','Africa',0,1,163),

('LS','LSO',426,'266','LSL','Lesotho Loti','L','Lesotho','Lesotho','Basotho','🇱🇸','Maseru','Africa',0,1,164),

('SZ','SWZ',748,'268','SZL','Lilangeni','E','Eswatini','eSwatini','Swazi','🇸🇿','Mbabane','Africa',0,1,165),

('ML','MLI',466,'223','XOF','West African CFA Franc','CFA','Mali','Mali','Malian','🇲🇱','Bamako','Africa',0,1,166),

('BF','BFA',854,'226','XOF','West African CFA Franc','CFA','Burkina Faso','Burkina Faso','Burkinabé','🇧🇫','Ouagadougou','Africa',0,1,167),

('NE','NER',562,'227','XOF','West African CFA Franc','CFA','Niger','Niger','Nigerien','🇳🇪','Niamey','Africa',0,1,168),

('SN','SEN',686,'221','XOF','West African CFA Franc','CFA','Senegal','Sénégal','Senegalese','🇸🇳','Dakar','Africa',0,1,169),

('GM','GMB',270,'220','GMD','Gambian Dalasi','D','Gambia','The Gambia','Gambian','🇬🇲','Banjul','Africa',0,1,170),

('GN','GIN',324,'224','GNF','Guinean Franc','FG','Guinea','Guinée','Guinean','🇬🇳','Conakry','Africa',0,1,171),

('GW','GNB',624,'245','XOF','West African CFA Franc','CFA','Guinea-Bissau','Guiné-Bissau','Bissau-Guinean','🇬🇼','Bissau','Africa',0,1,172),

('SL','SLE',694,'232','SLE','Sierra Leonean Leone','Le','Sierra Leone','Sierra Leone','Sierra Leonean','🇸🇱','Freetown','Africa',0,1,173),

('LR','LBR',430,'231','LRD','Liberian Dollar','$','Liberia','Liberia','Liberian','🇱🇷','Monrovia','Africa',0,1,174),

('CI','CIV',384,'225','XOF','West African CFA Franc','CFA','Côte d''Ivoire','Côte d''Ivoire','Ivorian','🇨🇮','Yamoussoukro','Africa',0,1,175),

('GH','GHA',288,'233','GHS','Ghanaian Cedi','₵','Ghana','Ghana','Ghanaian','🇬🇭','Accra','Africa',0,1,176),
('TG','TGO',768,'228','XOF','West African CFA Franc','CFA','Togo','Togo','Togolese','🇹🇬','Lomé','Africa',0,1,177),

('BJ','BEN',204,'229','XOF','West African CFA Franc','CFA','Benin','Bénin','Beninese','🇧🇯','Porto-Novo','Africa',0,1,178),

('MR','MRT',478,'222','MRU','Mauritanian Ouguiya','UM','Mauritania','موريتانيا','Mauritanian','🇲🇷','Nouakchott','Africa',0,1,179),

('DZ','DZA',12,'213','DZD','Algerian Dinar','د.ج','Algeria','الجزائر','Algerian','🇩🇿','Algiers','Africa',0,1,180),

('TN','TUN',788,'216','TND','Tunisian Dinar','د.ت','Tunisia','تونس','Tunisian','🇹🇳','Tunis','Africa',0,1,181),

('LY','LBY',434,'218','LYD','Libyan Dinar','ل.د','Libya','ليبيا','Libyan','🇱🇾','Tripoli','Africa',0,1,182),

('MA','MAR',504,'212','MAD','Moroccan Dirham','د.م.','Morocco','المغرب','Moroccan','🇲🇦','Rabat','Africa',0,1,183),

('EH','ESH',732,'212','MAD','Moroccan Dirham','د.م.','Western Sahara','الصحراء الغربية','Sahrawi','🇪🇭','El Aaiún','Africa',0,1,184),

('CV','CPV',132,'238','CVE','Cape Verdean Escudo','$','Cape Verde','Cabo Verde','Cape Verdean','🇨🇻','Praia','Africa',0,1,185),

('ST','STP',678,'239','STN','São Tomé and Príncipe Dobra','Db','São Tomé and Príncipe','São Tomé e Príncipe','Santomean','🇸🇹','São Tomé','Africa',0,1,186),


('PG','PNG',598,'675','PGK','Papua New Guinean Kina','K','Papua New Guinea','Papua New Guinea','Papua New Guinean','🇵🇬','Port Moresby','Oceania',0,1,189),

('FJ','FJI',242,'679','FJD','Fijian Dollar','$','Fiji','Fiji','Fijian','🇫🇯','Suva','Oceania',0,1,190),

('SB','SLB',90,'677','SBD','Solomon Islands Dollar','$','Solomon Islands','Solomon Islands','Solomon Islander','🇸🇧','Honiara','Oceania',0,1,191),

('VU','VUT',548,'678','VUV','Vanuatu Vatu','VT','Vanuatu','Vanuatu','Ni-Vanuatu','🇻🇺','Port Vila','Oceania',0,1,192),

('WS','WSM',882,'685','WST','Samoan Tala','T','Samoa','Samoa','Samoan','🇼🇸','Apia','Oceania',0,1,193),

('TO','TON',776,'676','TOP','Tongan Paʻanga','T$','Tonga','Tonga','Tongan','🇹🇴','Nukuʻalofa','Oceania',0,1,194),

('KI','KIR',296,'686','AUD','Australian Dollar','$','Kiribati','Kiribati','I-Kiribati','🇰🇮','Tarawa','Oceania',0,1,195),

('TV','TUV',798,'688','AUD','Australian Dollar','$','Tuvalu','Tuvalu','Tuvaluan','🇹🇻','Funafuti','Oceania',0,1,196),

('NR','NRU',520,'674','AUD','Australian Dollar','$','Nauru','Nauru','Nauruan','🇳🇷','Yaren','Oceania',0,1,197),

('PW','PLW',585,'680','USD','US Dollar','$','Palau','Belau','Palauan','🇵🇼','Ngerulmud','Oceania',0,1,198),

('FM','FSM',583,'691','USD','US Dollar','$','Micronesia','Micronesia','Micronesian','🇫🇲','Palikir','Oceania',0,1,199),

('MH','MHL',584,'692','USD','US Dollar','$','Marshall Islands','Marshall Islands','Marshallese','🇲🇭','Majuro','Oceania',0,1,200),

('CK','COK',184,'682','NZD','New Zealand Dollar','$','Cook Islands','Cook Islands','Cook Islander','🇨🇰','Avarua','Oceania',0,1,201),

('NU','NIU',570,'683','NZD','New Zealand Dollar','$','Niue','Niue','Niuean','🇳🇺','Alofi','Oceania',0,1,202),

('PF','PYF',258,'689','XPF','CFP Franc','₣','French Polynesia','Polynésie française','French Polynesian','🇵🇫','Papeete','Oceania',0,1,203),

('NC','NCL',540,'687','XPF','CFP Franc','₣','New Caledonia','Nouvelle-Calédonie','New Caledonian','🇳🇨','Nouméa','Oceania',0,1,204),

('GU','GUM',316,'1','USD','US Dollar','$','Guam','Guam','Guamanian','🇬🇺','Hagåtña','Oceania',0,1,205),

('MP','MNP',580,'1','USD','US Dollar','$','Northern Mariana Islands','Northern Mariana Islands','Northern Marianan','🇲🇵','Saipan','Oceania',0,1,206),

('AS','ASM',16,'1','USD','US Dollar','$','American Samoa','American Samoa','American Samoan','🇦🇸','Pago Pago','Oceania',0,1,207),
('TK','TKL',772,'690','NZD','New Zealand Dollar','$','Tokelau','Tokelau','Tokelauan','🇹🇰','Nukunonu','Oceania',0,1,208),

('WF','WLF',876,'681','XPF','CFP Franc','₣','Wallis and Futuna','Wallis-et-Futuna','Wallisian','🇼🇫','Mata-Utu','Oceania',0,1,209),

('AQ','ATA',10,'672','','','','Antarctica','Antarctica','Antarctican','🇦🇶','','Antarctica',0,1,210),

('AI','AIA',660,'1','XCD','East Caribbean Dollar','$','Anguilla','Anguilla','Anguillan','🇦🇮','The Valley','North America',0,1,211),

('AW','ABW',533,'297','AWG','Aruban Florin','ƒ','Aruba','Aruba','Aruban','🇦🇼','Oranjestad','North America',0,1,212),

('BQ','BES',535,'599','USD','US Dollar','$','Caribbean Netherlands','Caribbean Netherlands','Dutch Caribbean','🇧🇶','Kralendijk','North America',0,1,213),

('KY','CYM',136,'1','KYD','Cayman Islands Dollar','$','Cayman Islands','Cayman Islands','Caymanian','🇰🇾','George Town','North America',0,1,214),

('CW','CUW',531,'599','ANG','Netherlands Antillean Guilder','ƒ','Curaçao','Curaçao','Curaçaoan','🇨🇼','Willemstad','North America',0,1,215),

('GP','GLP',312,'590','EUR','Euro','€','Guadeloupe','Guadeloupe','Guadeloupean','🇬🇵','Basse-Terre','North America',0,1,216),

('MQ','MTQ',474,'596','EUR','Euro','€','Martinique','Martinique','Martiniquais','🇲🇶','Fort-de-France','North America',0,1,217),

('MS','MSR',500,'1','XCD','East Caribbean Dollar','$','Montserrat','Montserrat','Montserratian','🇲🇸','Brades','North America',0,1,218),

('PR','PRI',630,'1','USD','US Dollar','$','Puerto Rico','Puerto Rico','Puerto Rican','🇵🇷','San Juan','North America',0,1,219),

('BL','BLM',652,'590','EUR','Euro','€','Saint Barthélemy','Saint-Barthélemy','Saint-Barth','🇧🇱','Gustavia','North America',0,1,220),

('MF','MAF',663,'590','EUR','Euro','€','Saint Martin','Saint-Martin','Saint-Martinois','🇲🇫','Marigot','North America',0,1,221),

('PM','SPM',666,'508','EUR','Euro','€','Saint Pierre and Miquelon','Saint-Pierre-et-Miquelon','Saint-Pierrais','🇵🇲','Saint-Pierre','North America',0,1,222),

('SX','SXM',534,'1','ANG','Netherlands Antillean Guilder','ƒ','Sint Maarten','Sint Maarten','Sint Maartener','🇸🇽','Philipsburg','North America',0,1,223),

('TC','TCA',796,'1','USD','US Dollar','$','Turks and Caicos Islands','Turks and Caicos Islands','Turks and Caicos Islander','🇹🇨','Cockburn Town','North America',0,1,224),

('VG','VGB',92,'1','USD','US Dollar','$','British Virgin Islands','British Virgin Islands','British Virgin Islander','🇻🇬','Road Town','North America',0,1,225),

('VI','VIR',850,'1','USD','US Dollar','$','U.S. Virgin Islands','United States Virgin Islands','U.S. Virgin Islander','🇻🇮','Charlotte Amalie','North America',0,1,226),

('FK','FLK',238,'500','FKP','Falkland Islands Pound','£','Falkland Islands','Falkland Islands','Falkland Islander','🇫🇰','Stanley','South America',0,1,227),

('YT','MYT',175,'262','EUR','Euro','€','Mayotte','Mayotte','Mahoran','🇾🇹','Mamoudzou','Africa',0,1,228),

('RE','REU',638,'262','EUR','Euro','€','Réunion','La Réunion','Réunionese','🇷🇪','Saint-Denis','Africa',0,1,229),
('SH','SHN',654,'290','SHP','Saint Helena Pound','£','Saint Helena','Saint Helena','Saint Helenian','🇸🇭','Jamestown','Africa',0,1,230),

('IO','IOT',86,'246','USD','US Dollar','$','British Indian Ocean Territory','British Indian Ocean Territory','British Indian Ocean Territory Citizen','🇮🇴','Diego Garcia','Asia',0,1,231),

('CX','CXR',162,'61','AUD','Australian Dollar','$','Christmas Island','Christmas Island','Christmas Islander','🇨🇽','Flying Fish Cove','Asia',0,1,232),

('CC','CCK',166,'61','AUD','Australian Dollar','$','Cocos (Keeling) Islands','Cocos (Keeling) Islands','Cocos Islander','🇨🇨','West Island','Asia',0,1,233),

('HM','HMD',334,'672','AUD','Australian Dollar','$','Heard Island and McDonald Islands','Heard Island and McDonald Islands','','🇭🇲','','Antarctica',0,1,234),

('NF','NFK',574,'672','AUD','Australian Dollar','$','Norfolk Island','Norfolk Island','Norfolk Islander','🇳🇫','Kingston','Oceania',0,1,235),

('SJ','SJM',744,'47','NOK','Norwegian Krone','kr','Svalbard and Jan Mayen','Svalbard og Jan Mayen','Norwegian','🇸🇯','Longyearbyen','Europe',0,1,236),

('AX','ALA',248,'358','EUR','Euro','€','Åland Islands','Åland','Ålander','🇦🇽','Mariehamn','Europe',0,1,237),

('JE','JEY',832,'44','GBP','Pound Sterling','£','Jersey','Jersey','Jerseyman','🇯🇪','Saint Helier','Europe',0,1,238),

('GG','GGY',831,'44','GBP','Pound Sterling','£','Guernsey','Guernsey','Guernseyman','🇬🇬','Saint Peter Port','Europe',0,1,239),

('IM','IMN',833,'44','GBP','Pound Sterling','£','Isle of Man','Isle of Man','Manx','🇮🇲','Douglas','Europe',0,1,240),

('PS','PSE',275,'970','ILS','Israeli New Shekel','₪','Palestine','فلسطين','Palestinian','🇵🇸','Ramallah','Asia',0,1,241);

SET FOREIGN_KEY_CHECKS = 1;