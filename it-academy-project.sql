-- --------------------------------------------------------
-- Хост:                         localhost
-- Версия сервера:               10.4.32-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT COMMENT='типы блоков';

-- Дамп данных таблицы it-academy-project.block_types: ~16 rows (приблизительно)
INSERT INTO `block_types` (`id`, `code`, `name`) VALUES
	(1, 'HEADER', 'заголовок'),
	(2, 'FORMATTED_TEXT', 'форматированный текст'),
	(3, 'IMAGE', 'изображение'),
	(4, 'SEARCH', 'строка поиска'),
	(5, 'URL_CAKE_HEADER', 'торт из УРЛа: заголовок'),
	(6, 'URL_CAKE_TEXT', 'торт из УРЛа: контент'),
	(7, 'CONTACTS', 'контакты'),
	(8, 'CONTAINER_LTR', 'контейнер: укладка слева направо'),
	(9, 'CONTAINER_2COL', 'контейнер: укладка в две колонки'),
	(10, 'URL_INDPAGE_TEXT', 'содержимое страницы из УРЛа: контент'),
	(11, 'CAKES_LIST', 'список тортов'),
	(12, 'CUPCAKES_LIST', 'список капкейков'),
	(13, 'SITES_NAME', 'название сайта'),
	(14, 'LINK_TO_MAIN', 'ссылка на главную страницу'),
	(15, 'BUTTON_TO_SEARCH', 'кнопка поиска'),
	(16, 'BUTTON_TO_BUSKET', 'кнопка корзины'),
	(17, 'BUTTON_LOGIN', 'кнопка входа/регистрации');

-- Дамп структуры для таблица it-academy-project.cakes
CREATE TABLE IF NOT EXISTS `cakes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url_code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код для УРЛа',
  `header` varchar(200) NOT NULL DEFAULT '' COMMENT 'заголовок для торта (и он же в title)',
  `content` int(11) unsigned NOT NULL DEFAULT 0 COMMENT 'текст с описанием торта (контент)',
  `metakeywords` text NOT NULL COMMENT 'ключевые слова для meta keywords',
  `metadescription` text NOT NULL COMMENT 'текст для meta description',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `news_uc_i` (`url_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT COMMENT='торты';

-- Дамп данных таблицы it-academy-project.cakes: ~0 rows (приблизительно)

-- Дамп структуры для таблица it-academy-project.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) DEFAULT NULL,
  `name` mediumtext DEFAULT NULL,
  `create` datetime DEFAULT NULL,
  `role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Список зарегистрированных клиентов';

-- Дамп данных таблицы it-academy-project.clients: ~0 rows (приблизительно)
INSERT INTO `clients` (`id`, `name`, `create`, `role`) VALUES
	(1, 'puffin', '2024-12-15 12:11:45', 1),
	(2, 'mini-puffin', '2024-12-15 12:14:49', 2);

-- Дамп структуры для таблица it-academy-project.contents
CREATE TABLE IF NOT EXISTS `contents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `comment` varchar(200) NOT NULL DEFAULT '' COMMENT 'комментарий (для слушателей курса)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='контенты';

-- Дамп данных таблицы it-academy-project.contents: ~11 rows (приблизительно)
INSERT INTO `contents` (`id`, `comment`) VALUES
	(22, 'макет "страница одного торта или капкейков", контент места "шапка"'),
	(33, 'макет "страница одного торта или капкейков", контент места "подвал"'),
	(44, 'макет "страница одного торта или капкейков", контент места "продукт из УРЛа"'),
	(55, 'макет "индивидуальная страница", контент места "содержимое страницы из УРЛа"'),
	(111, 'контент индивидуальной страницы "главная"'),
	(112, 'контент блока с укладкой слева направо на странице "Главная"'),
	(113, 'контент левой колонки в двухколоночном блоке в контенте страницы "Главная"'),
	(114, 'контент правой колонки в двухколоночном блоке в контенте страницы "Главная"'),
	(222, 'контент индивидуальной страницы "список тортов"'),
	(333, 'контент индивидуальной страницы "список капкейков"'),
	(444, 'контент индивидуальной страницы "вход и регистрация"'),
	(555, 'контент индивидуальной страницы "корзина"');

-- Дамп структуры для таблица it-academy-project.contents_blocks
CREATE TABLE IF NOT EXISTS `contents_blocks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `content` int(11) unsigned DEFAULT 0 COMMENT 'контент, которому принадлежит блок',
  `content_ord` int(11) NOT NULL DEFAULT 0 COMMENT 'порядок расположения блока внутри контента',
  `block_type` smallint(5) unsigned NOT NULL DEFAULT 0 COMMENT 'тип блока',
  `block_attributes` mediumtext DEFAULT NULL COMMENT 'атрибуты блока (для каждого типа блока свои!)',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `contents_blocks_c_co_i` (`content`,`content_ord`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT COMMENT='блоки в контентах';

-- Дамп данных таблицы it-academy-project.contents_blocks: ~27 rows (приблизительно)
INSERT INTO `contents_blocks` (`id`, `content`, `content_ord`, `block_type`, `block_attributes`) VALUES
	(1, 777, 1, 3, '{"image":1}'),
	(2, 777, 2, 13, '{"text": "Sladkiy tortik"}'),
	(3, 777, 3, 14, '{"text":<button type="button" onclick="location.href=\'/login\'">Вход / Регистрация</button>}'),
	(4, 777, 4, 4, '{"text": <input type="text" placeholder="Найти...">}'),
	(5, 777, 5, 15, '{"text":<button type="submit">Поиск</button>}'),
	(6, 777, 6, 16, '{"text":<div class="basket">\r\n                <button type="button" onclick="location.href=\'/basket\'">Корзина</button>\r\n            </div>}'),
	(7, 777, 7, 17, '{"text":<button type="button" onclick="location.href=\'/login\'">Вход / Регистрация</button>}'),
	(9, 22, 1, 8, '{"content":777}'),
	(10, 888, 1, 3, '{"image":2}'),
	(11, 888, 2, 7, '{"text":<span>Наш Instagram: @sladkiytortik</span>}'),
	(12, 999, 3, 3, '{"image":3}'),
	(13, 999, 4, 7, '{"text":<span>Телефон: +375 29 123-45-67</span>}'),
	(14, 33, 1, 9, '{"content1":888,"content2":999}'),
	(15, 55, 1, 10, ''),
	(16, 666, 2, 12, '{"content":777}'),
	(17, 777, 1, 3, '{"image":1}'),
	(18, 777, 2, 4, '{"location":"Минск","period":"неделя"}'),
	(19, 566, 4, 11, '{"content1":888,"content2":999}'),
	(20, 888, 2, 3, '{"image":1}'),
	(21, 888, 1, 2, '{"text":"А вот картинка дня:"}'),
	(22, 999, 1, 4, '{"location":"Минск","period":"неделя"}'),
	(23, 999, 2, 2, '{"text":"важней всего погода в доме!"}'),
	(24, 333, 0, 1, '{"text":"Добро пожаловать на наш сайт!"}'),
	(25, 444, 0, 2, '{"text":"текст для новостей"}'),
	(26, 55, 1, 12, NULL),
	(27, 333, 1, 2, '{"text":"Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Если вас интересует прогноз погоды по региону Минск, период - неделя, вам к нам! / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт! Ставка рефинансирования - {OF|SR}! Добро пожаловать на наш сайт, который называется {OS|SITENAME}!"}'),
	(28, 444, 1, 13, NULL);

-- Дамп структуры для таблица it-academy-project.cupcakes
CREATE TABLE IF NOT EXISTS `cupcakes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url_code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код для УРЛа',
  `header` varchar(200) NOT NULL DEFAULT '' COMMENT 'заголовок для капкейков (и он же в title)',
  `content` int(11) unsigned NOT NULL DEFAULT 0 COMMENT 'текст с описанием капкейков (контент)',
  `metakeywords` text NOT NULL COMMENT 'ключевые слова для meta keywords',
  `metadescription` text NOT NULL COMMENT 'текст для meta description',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `news_uc_i` (`url_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT COMMENT='торты';

-- Дамп данных таблицы it-academy-project.cupcakes: ~0 rows (приблизительно)

-- Дамп структуры для таблица it-academy-project.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код изображения',
  `url` varchar(200) NOT NULL DEFAULT '' COMMENT 'локальный путь к изображению',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT COMMENT='изображения';

-- Дамп данных таблицы it-academy-project.images: ~2 rows (приблизительно)
INSERT INTO `images` (`id`, `code`, `url`) VALUES
	(1, 'LOGO', './public/static/logo.PNG'),
	(2, 'CAKES_LIST', './public/static/pictures/menu_cakes.PNG'),
	(3, 'CUPCAKES_LIST', './public/static/pictures/menu_cupcakes.PNG');

-- Дамп структуры для таблица it-academy-project.indpages
CREATE TABLE IF NOT EXISTS `indpages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT 'код для УРЛа',
  `content` int(11) unsigned NOT NULL DEFAULT 0 COMMENT 'контент страницы',
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT 'текст для title',
  `metakeywords` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ключевые слова для meta keywords',
  `metadiscription` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'текст для meta discription',
  PRIMARY KEY (`id`),
  KEY `url_code` (`url_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT;

-- Дамп данных таблицы it-academy-project.indpages: ~0 rows (приблизительно)

-- Дамп структуры для таблица it-academy-project.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint(20) DEFAULT NULL,
  `author` mediumtext DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `create` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Отзывы на продукцию';

-- Дамп данных таблицы it-academy-project.reviews: ~0 rows (приблизительно)

-- Дамп структуры для таблица it-academy-project.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Роли с правами';

-- Дамп данных таблицы it-academy-project.roles: ~2 rows (приблизительно)
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'admin'),
	(2, 'user');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
