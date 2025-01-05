#!/bin/bash
# Конфигурация
DB_NAME="it-academy-project"
DB_USER="root"
DB_PASS="1234"
SITE_DIR="/home/user/homework/it-academy-project"
BACKUP_DIR="/home/user/homework/it-academy-project/backups/$(date +%Y%m%d_%H%M%S)"
ZIP_NAME="backup.zip"
# Создать каталог для бэкапа
mkdir -p "$BACKUP_DIR"
# Бэкап базы данных
mysqldump -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" > "$BACKUP_DIR/db_backup.sql"
# Архивирование данных сайта
zip -r "$BACKUP_DIR/$ZIP_NAME" "$SITE_DIR"
echo "Бэкап завершен. База данных и сайт сохранены в $BACKUP_DIR."