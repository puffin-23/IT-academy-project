#!/bin/bash

# Конфигурация
DB_NAME="it-academy-project"
DB_USER="root"
DB_PASS="1234"
BACKUP_DIR="/home/user/homework/it-academy-project/backups"
ZIP_NAME="backup.zip"

# Восстановление базы данных
mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$BACKUP_DIR/db_backup.sql"

# Извлечение данных сайта
unzip "$BACKUP_DIR/$ZIP_NAME" -d "home/user/homework/it-academy-project"

echo "Восстановление завершено. Данные сайта и база данных восстановлены."