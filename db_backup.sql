-- --------------------------------------------------------
-- Хост:                         localhost
-- Версия сервера:               5.7.26-0ubuntu0.16.04.1 - (Ubuntu)
-- Операционная система:         Linux
-- HeidiSQL Версия:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных it-academy-project
CREATE DATABASE IF NOT EXISTS `it-academy-project` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `it-academy-project`;

-- Дамп структуры для таблица it-academy-project.block_types
CREATE TABLE IF NOT EXISTS `block_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT 'название',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='типы блоков';

-- Дамп данных таблицы it-academy-project.block_types: ~24 rows (приблизительно)
INSERT INTO `block_types` (`id`, `code`, `name`) VALUES
	(1, 'HEADER', 'заголовок'),
	(2, 'FORMATTED_TEXT', 'форматированный текст'),
	(3, 'IMAGE', 'изображение'),
	(4, 'SEARCH', 'строка поиска'),
	(5, 'URL_CAKE_HEADER', 'торт из УРЛа: заголовок'),
	(6, 'URL_CAKE_TEXT', 'торт из УРЛа: контент'),
	(7, 'CONTACTS', 'контакты'),
	(8, 'CONTAINER_LTR', 'контейнер: укладка слева направо'),
	(9, 'MENU', 'контейнер меню: укладка в две колонки '),
	(10, 'URL_INDPAGE_TEXT', 'содержимое страницы из УРЛа: контент'),
	(11, 'CAKES_LIST', 'список тортов'),
	(12, 'CUPCAKES_LIST', 'список капкейков'),
	(13, 'SITES_NAME', 'Название сайта'),
	(14, 'LINK_TO_MAIN', 'ссылка на главную страницу'),
	(15, 'BUTTON_TO_SEARCH', 'кнопка поиска'),
	(16, 'BUTTON_TO_BASKET', 'кнопка корзины'),
	(17, 'BUTTON_LOGIN', 'кнопка входа/регистрации'),
	(18, 'IMAGE_LOGO', 'Логотип'),
	(19, 'FOOTER', 'подвал'),
	(20, 'LINK_TO_CAKES', 'ссылка на список тортов'),
	(21, 'LINK_TO_CUPCAKES', 'ссылка на список капкейков'),
	(22, 'FORM_TO_LOGIN', 'форма для входа/регистрации'),
	(23, 'URL_CUPCAKE_HEADER', 'капкейки из УРЛа: заголовок'),
	(24, 'URL_CUPCAKE_TEXT', 'капкейки из УРЛа: контент');

-- Дамп структуры для таблица it-academy-project.cakes
CREATE TABLE IF NOT EXISTS `cakes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url_code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код для УРЛа',
  `header` varchar(200) NOT NULL DEFAULT '' COMMENT 'заголовок для торта (и он же в title)',
  `content` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'текст с описанием торта (контент)',
  `metakeywords` text NOT NULL COMMENT 'ключевые слова для meta keywords',
  `metadescription` text NOT NULL COMMENT 'текст для meta description',
  `image_cake` varchar(50) DEFAULT NULL COMMENT 'УРЛ картинки',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `news_uc_i` (`url_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='торты';

-- Дамп данных таблицы it-academy-project.cakes: ~3 rows (приблизительно)
INSERT INTO `cakes` (`id`, `url_code`, `header`, `content`, `metakeywords`, `metadescription`, `image_cake`) VALUES
	(1, 'coconut_cake', 'Кокосовый торт ', 1001, 'кокосовый, торт ', 'Страница с подробностями про кокосовый тор', '/static/coconut_cake.png_compressed.PNG'),
	(2, 'creamy_raspberry_cake', 'Сливочно-малиновый торт', 1002, 'сливочно-малиновый, торт', 'Страница с подробностями про сливочно-малиновый торт', '/static/creamy_raspberry_cake.png_compressed.PNG'),
	(3, 'chocolate_cake', 'Шоколадный торт', 1003, 'шоколадный, торт', 'Страница с подробностями про шоколадный торт', '/static/chocolate_cake.png_compressed.PNG');

-- Дамп структуры для таблица it-academy-project.contents
CREATE TABLE IF NOT EXISTS `contents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `comment` varchar(200) NOT NULL DEFAULT '' COMMENT 'комментарий (для слушателей курса)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2004 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='контенты';

-- Дамп данных таблицы it-academy-project.contents: ~19 rows (приблизительно)
INSERT INTO `contents` (`id`, `comment`) VALUES
	(22, 'макет для всех страниц, контент места "шапка"'),
	(33, 'макет для всех страниц, контент места "подвал"'),
	(44, 'макет "страница одного торта", контент места "торт из УРЛа"'),
	(55, 'контент индивидуальной страницы "главная"'),
	(66, 'макет "страница одного вида капкейков", контент места "капкейки из УРЛа"'),
	(111, 'макет "индивидуальная страница", контент места "содержимое страницы из УРЛа"'),
	(112, 'контент блока с укладкой слева направо на странице "Главная"'),
	(113, 'контент левой колонки в двухколоночном блоке в контенте страницы "Главная"'),
	(114, 'контент правой колонки в двухколоночном блоке в контенте страницы "Главная"'),
	(222, 'контент индивидуальной страницы "список тортов"'),
	(333, 'контент индивидуальной страницы "список капкейков"'),
	(444, 'контент индивидуальной страницы "вход и регистрация"'),
	(999, 'контент индивидуальной страницы "Admin Panel"'),
	(1001, 'контент торта "Кокосовый торт"'),
	(1002, 'контент торта "Сливочно-малиновый торт"'),
	(1003, 'контент торта "Шоколадный торт"'),
	(2001, 'контент капкейков "Шоколадно-ванильные капкейки"'),
	(2002, 'контент капкейков "Шоколадные капкейки"'),
	(2003, 'контент капкейков "Ванильные капкейки"');

-- Дамп структуры для таблица it-academy-project.contents_blocks
CREATE TABLE IF NOT EXISTS `contents_blocks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `content` int(11) unsigned DEFAULT '0' COMMENT 'контент, которому принадлежит блок',
  `content_ord` int(11) NOT NULL DEFAULT '0' COMMENT 'порядок расположения блока внутри контента',
  `block_type` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT 'тип блока',
  `block_attributes` mediumtext COMMENT 'атрибуты блока (для каждого типа блока свои!)',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `contents_blocks_c_co_i` (`content`,`content_ord`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='блоки в контентах';

-- Дамп данных таблицы it-academy-project.contents_blocks: ~27 rows (приблизительно)
INSERT INTO `contents_blocks` (`id`, `content`, `content_ord`, `block_type`, `block_attributes`) VALUES
	(1, 777, 0, 18, '{"image":1}'),
	(2, 777, 1, 13, '{"text":"Sladkiy tortik"}'),
	(3, 777, 2, 14, '{"text":"Главная"}'),
	(4, 777, 3, 4, ''),
	(5, 777, 4, 15, ''),
	(6, 777, 5, 16, '{"text":"Корзина"}'),
	(7, 777, 6, 17, '{"text":"Вход/Регистрация"}'),
	(9, 22, 1, 8, '{"content":777}'),
	(12, 55, 1, 9, '{"content1":113, "content2":114}'),
	(13, 33, 1, 7, '{"text":"@sladkiytortik"}'),
	(15, 113, 1, 20, '{"text":"Торты"}'),
	(16, 114, 2, 21, '{"text":"Капкейки"}'),
	(17, 444, 1, 22, '{"text":"Вход и Регистрация"}'),
	(18, 222, 0, 11, '{"content":223}'),
	(19, 223, 1, 0, NULL),
	(20, 333, 0, 12, '{"content":334}'),
	(21, 334, 1, 0, NULL),
	(23, 44, 1, 5, NULL),
	(24, 44, 2, 6, NULL),
	(25, 66, 1, 23, NULL),
	(26, 66, 2, 24, NULL),
	(29, 1001, 1, 2, '{"text":"Описание: ванильный бисквит с творожным кремом и кокосовой стрижкой. Стоимость: 80 рублей"}'),
	(30, 1002, 1, 2, '{"text":"Описание: ванильный бисквит со сливочным кремом и конфитюром из малины. Цена:90 рублей"}'),
	(31, 1003, 1, 2, '{"text":"Описание: шоколадный бисквит с шоколадным кремом. Цена:70 рублей"}'),
	(32, 2001, 1, 2, '{"text":"Описание: капкейки из шоколадного и ванильного бисквита. Цена:50 рублей"}'),
	(33, 2002, 1, 2, '{"text":"Описание: капкейки из шоколадного бисквита. Цена:60 рублей"}'),
	(34, 2003, 1, 2, '{"text":"Описание: капкейки из ванильного бисквита. Цена:40 рублей"}');

-- Дамп структуры для таблица it-academy-project.cupcakes
CREATE TABLE IF NOT EXISTS `cupcakes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url_code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код для УРЛа',
  `header` varchar(200) NOT NULL DEFAULT '' COMMENT 'заголовок для капкейков (и он же в title)',
  `content` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'текст с описанием капкейков (контент)',
  `metakeywords` text NOT NULL COMMENT 'ключевые слова для meta keywords',
  `metadescription` text NOT NULL COMMENT 'текст для meta description',
  `image_cupcake` mediumtext COMMENT 'УРЛ картинки капкейков',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `news_uc_i` (`url_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='торты';

-- Дамп данных таблицы it-academy-project.cupcakes: ~3 rows (приблизительно)
INSERT INTO `cupcakes` (`id`, `url_code`, `header`, `content`, `metakeywords`, `metadescription`, `image_cupcake`) VALUES
	(1, 'chocolate_vanilla_cupcakes', 'Шоколадно-ванильные капкейки', 2001, 'шоколадно-ванильные, капкейки', 'Страница с подробностями о шоколадно-ванильных капкейках', '/static/chocolate_vanilla_cupcakes.png_compressed.PNG'),
	(2, 'chocolate_cupcakes', 'Шоколадные капкейки', 2002, 'шоколадные, капкейки', 'Страница с подробностями о шоколадных капкейках', '/static/chocolate_cupcakes.png_compressed.PNG'),
	(3, 'vanilla_cupcakes', 'Ванильные капкейки', 2003, 'ванильные, капкейки', 'Страница с подробностями о ванильных капкейках', '/static/vanilla_cupcakes.jpg_compressed.PNG');

-- Дамп структуры для таблица it-academy-project.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код изображения',
  `url` varchar(200) NOT NULL DEFAULT '' COMMENT 'локальный путь к изображению',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='изображения';

-- Дамп данных таблицы it-academy-project.images: ~1 rows (приблизительно)
INSERT INTO `images` (`id`, `code`, `url`) VALUES
	(1, 'LOGO', '/static/logo.PNG');

-- Дамп структуры для таблица it-academy-project.indpages
CREATE TABLE IF NOT EXISTS `indpages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url_code` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'код для УРЛа',
  `content` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'контент страницы',
  `title` varchar(200) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'текст для title',
  `metakeywords` text CHARACTER SET utf8 NOT NULL COMMENT 'ключевые слова для meta keywords',
  `metadescription` text CHARACTER SET utf8 NOT NULL COMMENT 'текст для meta discription',
  PRIMARY KEY (`id`),
  KEY `url_code` (`url_code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT;

-- Дамп данных таблицы it-academy-project.indpages: ~5 rows (приблизительно)
INSERT INTO `indpages` (`id`, `url_code`, `content`, `title`, `metakeywords`, `metadescription`) VALUES
	(1, 'main', 55, 'Главная', 'торты, капкейки', 'наш сайт с лучшими тортами и капкейками'),
	(2, 'cakes', 222, 'Торты', 'торты', 'варианты тортов для заказа'),
	(3, 'cupcakes', 0, 'Капкейки', 'капкейки', 'варианты капкейков для заказа'),
	(4, 'login', 444, 'Вход/регистрация', 'вход, регистрация', 'вход и регистрация пользователей'),
	(5, 'admin', 999, 'Admin Panel', '', '');

-- Дамп структуры для таблица it-academy-project.options
CREATE TABLE IF NOT EXISTS `options` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `code` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'код настройки',
  `comment` varchar(200) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'комментарий',
  `str_value` varchar(250) CHARACTER SET utf8 DEFAULT NULL COMMENT 'значение настройки, если оно строковое',
  `int_value` int(11) DEFAULT NULL COMMENT 'значение настройки, если оно целочисленное',
  `float_value` double DEFAULT NULL COMMENT 'значение настройки, если оно дробное',
  `datetime_value` datetime DEFAULT NULL COMMENT 'значение настройки, если оно дата-время',
  `text_value` mediumtext CHARACTER SET utf8 COMMENT 'значение настройки, если оно длинное текстовое',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Дамп данных таблицы it-academy-project.options: ~1 rows (приблизительно)
INSERT INTO `options` (`id`, `code`, `comment`, `str_value`, `int_value`, `float_value`, `datetime_value`, `text_value`) VALUES
	(17, 'SITENAME', 'название сайта', 'Sladkiy tortik', NULL, NULL, NULL, NULL);

-- Дамп структуры для таблица it-academy-project.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint(20) DEFAULT NULL,
  `author` mediumtext COLLATE utf8_bin,
  `content` longtext COLLATE utf8_bin,
  `create` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Отзывы на продукцию';

-- Дамп данных таблицы it-academy-project.reviews: ~0 rows (приблизительно)

-- Дамп структуры для таблица it-academy-project.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Роли с правами';

-- Дамп данных таблицы it-academy-project.roles: ~2 rows (приблизительно)
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'admin'),
	(2, 'user');

-- Дамп структуры для таблица it-academy-project.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `token` mediumtext CHARACTER SET utf8 NOT NULL,
  `created_at` datetime NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `user_role` mediumtext CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Дамп данных таблицы it-academy-project.tokens: ~45 rows (приблизительно)
INSERT INTO `tokens` (`id`, `user_id`, `token`, `created_at`, `expires_at`, `user_role`) VALUES
	(5, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDE1Nzk5fQ.fglmF3rUscH3jmHyhsLkTWQhEpomQ-6BO4OI9OEpNqI', '2024-12-28 19:56:39', '2024-12-29 19:56:39', 'admin'),
	(6, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDE1OTM3fQ.CL4rRyZybQ8oewC65AN9b9mALC1_WTa_yg_6b7h6C1Q', '2024-12-28 19:58:57', '2024-12-29 19:58:57', 'admin'),
	(7, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDE2NDg3fQ.MQNO6x4JcNOby_P8UKL7ijaqoQkrZzY-F2-yx19N_Hk', '2024-12-28 20:08:07', '2024-12-29 20:08:07', 'admin'),
	(8, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDE2NzMwfQ.SRslTYQvnC8WuOVnKQwq-cahVtsGw9XIB2rnoCbIIIQ', '2024-12-28 20:12:10', '2024-12-29 20:12:10', 'admin'),
	(9, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDE2OTI1fQ.8dSoK4HUZAENahFzUS2JXOftlrokCKNCkWNShxQkcJo', '2024-12-28 20:15:25', '2024-12-29 20:15:25', 'admin'),
	(10, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDE2OTc3fQ.Iz0HISaUrv2p3hvlC5GEQ-HrVpPeBC1obwgGgrBowqc', '2024-12-28 20:16:17', '2024-12-29 20:16:17', 'admin'),
	(11, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg0MjkyfQ.6c6y4-_0QbI8DUA7fXtUAps3ZKV-osnX4y43LvyX-Fo', '2024-12-29 14:58:12', '2024-12-30 14:58:12', 'admin'),
	(12, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg0NTEzfQ.CKJv-yvi0tDa2fF0RWUmq9qOaBzPf3jo6tYiAXYF8Vw', '2024-12-29 15:01:53', '2024-12-30 15:01:53', 'admin'),
	(13, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg0NjA5fQ.4Xx1hYicU7uqcCZpQkuLRL8oBsQiwkjRm_z_f3kp5rg', '2024-12-29 15:03:29', '2024-12-30 15:03:29', 'admin'),
	(14, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg0ODI2fQ.dkQNDXgyfYUorsJkU7NnUDRJDs4euUotm4ICapH3Opg', '2024-12-29 15:07:06', '2024-12-30 15:07:06', 'admin'),
	(15, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg0OTEwfQ.OzJ2wFsTZSzVbOZz1LblZnGGMue-symAdb4nU9y43Rw', '2024-12-29 15:08:30', '2024-12-30 15:08:30', 'admin'),
	(16, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg1NzM1fQ.z9dEw0lPq67A_VuVfr8E6SYXbeYMw4OVf2rTLt688c0', '2024-12-29 15:22:15', '2024-12-30 15:22:15', 'admin'),
	(17, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg2MjkxfQ.TzpMAOYZC13bWeyoXVRlnq5ihRYPTnXThBnZJAM2yEY', '2024-12-29 15:31:31', '2024-12-30 15:31:31', 'admin'),
	(18, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg2NzQ5fQ.mbseDQqICSJ9eKrGrxlAcjMzB6j62mAmwUlPP5v3dFI', '2024-12-29 15:39:09', '2024-12-30 15:39:09', 'admin'),
	(19, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg3MDMwfQ.VVbVCTYRQ9syP1SEjIcFpb88gn4cqjr6omvCg3SAO1I', '2024-12-29 15:43:50', '2024-12-30 15:43:50', 'admin'),
	(20, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NDg3MTcyfQ.WgE3NHDFcMBuI-YwBAD0ltCPdLkmPhwfc_XbEnh1bAc', '2024-12-29 15:46:12', '2024-12-30 15:46:12', 'admin'),
	(21, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzM1NTcyNjIzfQ.uSwP_zQ7wVGZH2fIgancExerpgq_b_8hLKFgwTa0cMI', '2024-12-30 15:30:23', '2024-12-31 15:30:23', 'admin'),
	(22, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NTc0ODI0fQ.WpwGxKDoDdAh-0yqD5LjHx4IzqsCJl_55iXiywIFEHQ', '2024-12-30 16:07:04', '2024-12-31 16:07:04', 'admin'),
	(23, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NTc1MDM1fQ.yWFSyY3NG2xN9qBRiKtTrZ05yA69-qeHg6M5120EdR0', '2024-12-30 16:10:35', '2024-12-31 16:10:35', 'admin'),
	(24, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NTc1MzM3fQ.SjxeVcW-r6g2WU_dmpw8UjjOjrLypgHLep2ZM-6VuSI', '2024-12-30 16:15:37', '2024-12-31 16:15:37', 'admin'),
	(25, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NTc4OTQzfQ.O6OY_txafv9gdVedhEDs_7UEE0BXWPg8x11ALGqqIVg', '2024-12-30 17:15:43', '2024-12-31 17:15:43', 'admin'),
	(26, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NTc5MDAzfQ.cp5xp-w2W4M36KG9--WQJPqmNrmobcoJUfwkIeANfXs', '2024-12-30 17:16:43', '2024-12-31 17:16:43', 'admin'),
	(27, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NTgwNzIxfQ.AsYYAsDf-AL_o0BjFDDjDHXyN2ZhoIVVEelQgDc08mQ', '2024-12-30 17:45:21', '2024-12-31 17:45:21', 'admin'),
	(28, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NTgyNzAwfQ.xF19w-cny8mH85PitEs4SP2IFyY_m4Jtf2IwHi8alo4', '2024-12-30 18:18:20', '2024-12-31 18:18:20', 'admin'),
	(29, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NTgzNDg0fQ.z2rbvvjCG3VhnxM3-LbMl6e255T0C-tPxSlGiWw5nkw', '2024-12-30 18:31:24', '2024-12-31 18:31:24', 'admin'),
	(30, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NzI4MDE0fQ.oi0tJUJMGOE59_1mHjBbTIes7ZKY3NLQfz8AJ3NQpEA', '2025-01-01 10:40:14', '2025-01-02 10:40:14', 'admin'),
	(31, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1NzI4MDgxfQ.8PMdGvXfaQ4Ez-nHYmifJoWFn8chNaMx2N1FxecBW2I', '2025-01-01 10:41:21', '2025-01-02 10:41:21', 'admin'),
	(32, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1ODE4NTkyfQ.I5c7AwY-a1MbWiHcRh5gT1deQdMNgq8T_dpYUgosDBE', '2025-01-02 11:49:52', '2025-01-03 11:49:52', 'admin'),
	(33, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1ODM1NzkzfQ.IvTtJM6fe_7MpaKwbwxGYs4VVc6RH6HsovWEaQk1JVk', '2025-01-02 16:36:33', '2025-01-03 16:36:33', 'admin'),
	(34, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNTg0Mjc0MX0.FdGUdd1qj3wYhYuqLxezfTiuElmiex2o9lWxcm4TnXQ', '2025-01-02 18:32:21', '2025-01-03 18:32:21', 'admin'),
	(35, 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTczNTg0MjgzMn0.B6uJ10LkEE07k-9iylGBpPDx4ZnWRTuIZjsn8tJihnA', '2025-01-02 18:33:52', '2025-01-03 18:33:52', 'user'),
	(36, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNTg0Mjg2Nn0.cMqFlg49uG9W9630W7fnMZp1gpB4EAPl50T7wTrMeYg', '2025-01-02 18:34:26', '2025-01-03 18:34:26', 'admin'),
	(37, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNTg0MzA2NH0.ADll23MibbgPQSOG5r3MtJTuuOWI2dOp9IIYxUyOk-k', '2025-01-02 18:37:44', '2025-01-03 18:37:44', 'admin'),
	(38, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNTg0NTc2NX0.0swhcwvZGNW04ZWQOIYCdD-7T8pTEj4WdSik4QpeZr8', '2025-01-02 19:22:45', '2025-01-03 19:22:45', 'admin'),
	(39, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNTg0NjE3OX0.mtVwhmWewUtEs2bKnuzqRCXnD79mRfr8PSzL3bMGe4Q', '2025-01-02 19:29:39', '2025-01-03 19:29:39', 'admin'),
	(40, 18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTczNTkwNTQ0Mn0.LCUI-EJgX1jc22r1a1ugnpG6ZT3hgGDN3EuH7Oacr7I', '2025-01-03 11:57:22', '2025-01-04 11:57:22', 'user'),
	(41, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNTkwNTQ2N30.hALPXPrJg83Vjq1ErEG-SmgBxAG1mT3zPLuVr1mzVTA', '2025-01-03 11:57:47', '2025-01-04 11:57:47', 'admin'),
	(42, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNTkxMDIxOH0.vRG_QG3KRupykJjIQmYLhEq_ZaLk9Wh0f4iYFfU1LZ8', '2025-01-03 13:16:58', '2025-01-04 13:16:58', 'admin'),
	(43, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNTk4NDIyNH0.TfhiqaFgDWCXXIpNvECMgBGQbMAByAEHFa7yOjLhJQk', '2025-01-04 09:50:24', '2025-01-05 09:50:24', 'admin'),
	(44, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNjAwMTUwNX0.lE53Nk1SENLHlEFomxSWiwJQ14zU7NdyQ4QB8lqpojU', '2025-01-04 14:38:25', '2025-01-05 14:38:25', 'admin'),
	(45, 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczNjAwNTY0NH0.hvh70UTvWnzBVHVFdFktLkUV5OYA_q08MDWS0zz34GY', '2025-01-04 15:47:24', '2025-01-05 15:47:24', 'admin'),
	(46, 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTczNjAxMzc1N30.tQJZc7E6icVmkKRCCpOkbFA-NdToRy50cqkIg3IdtUM', '2025-01-04 18:02:37', '2025-01-05 18:02:37', 'user'),
	(47, 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTczNjAyMTIzMH0._RZJYnJ6P_tNXfb6hw61vRhn17iQ7eAoFougx3nA0IIng459g3n374cv57m0457c57nc2306puffin', '2025-01-04 20:07:10', '2025-01-05 20:07:10', 'user'),
	(48, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDIxNjQ2fQ.2c2RaU29jQL2725_LIPm8lovsuVmZv09RZpy7UezdVsng459g3n374cv57m0457c57nc2306puffin', '2025-01-04 20:14:06', '2025-01-05 20:14:06', 'admin'),
	(49, 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTczNjAyMjMzNX0.bynqG9Q1nH90iGPD_GPuUGv1YrZIGER97AcFdiDb-iAng459g3n374cv57m0457c57nc2306puffin', '2025-01-04 20:25:35', '2025-01-05 20:25:35', 'user');

-- Дамп структуры для таблица it-academy-project.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` mediumtext CHARACTER SET utf8 NOT NULL,
  `role` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `password` mediumtext CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Список зарегистрированных пользователей';

-- Дамп данных таблицы it-academy-project.users: ~2 rows (приблизительно)
INSERT INTO `users` (`id`, `username`, `role`, `password`) VALUES
	(1, 'admin', 'admin', '$2a$10$lOnwrzqyvDmv66zqzHwFnuniRvs5rLP20cN4UVzdjoVV0/F04qU/O'),
	(22, 'user', 'user', '$2a$10$z.Tk5lgKNjRBSRSfs2G9K.a/wDb.U9XXJjI3/i7kO.Lg/JHXttkjq');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
