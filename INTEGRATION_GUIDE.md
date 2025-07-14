# Инструкции по интеграции файлов от клиента

## 📁 Файлы для интеграции

### 1. assets.zip - Изображения продуктов
**Путь размещения:** `/app/frontend/public/assets/products/`

**Необходимые действия:**
1. Извлечь assets.zip
2. Разместить изображения продуктов в соответствии с именами:
   - `omilia.jpg` - для продукта OMILIA
   - `evochat.jpg` - для продукта EVOCHAT  
   - `geostatus.jpg` - для продукта GEOSTATUS
   - `creatio.jpg` - если есть продукт Creatio
   - `rpa.jpg` - если есть продукт RPA

### 2. phpmail.zip - PHPMailer и документы
**Путь размещения:** `/app/backend/`

**Необходимые действия:**
1. Извлечь phpmail.zip
2. Разместить папку `PHPMailer/` в `/app/backend/`
3. Разместить документы благодарственных писем в `/app/frontend/public/assets/documents/`

### 3. email.php - Готовый файл
**Статус:** ✅ Уже интегрирован

**Размещен в:** `/app/backend/email.php`
**API endpoint:** `/api/contact`

## 🔧 Настройка email отправки

### Для production среды:

1. **Обновить настройки SMTP** в файле `/app/backend/app/api/evotech.py`:
   - Указать реальные SMTP настройки
   - Добавить переменные окружения для безопасности

2. **Настроить reCAPTCHA**:
   - Получить ключи reCAPTCHA от Google
   - Добавить в форму консультации

## 📷 Интеграция изображений

### Текущий статус:
- ✅ Структура папок создана
- ✅ Fallback на внешние изображения настроен
- ⚠️ Нужно заменить на локальные изображения из assets.zip

### После размещения изображений:
1. Изображения автоматически подключатся
2. Fallback на внешние изображения отключится
3. Сайт будет использовать локальные файлы

## 📧 Тестирование email функциональности

### В demo режиме:
- Формы работают
- Данные логируются в консоль backend
- Показываются сообщения об успешной отправке

### Для production:
1. Раскомментировать PHPMailer код в `/app/backend/email.php`
2. Настроить SMTP параметры
3. Добавить reCAPTCHA

## 🚀 Быстрый старт

1. **Скачать файлы из GitHub:**
   ```bash
   wget https://github.com/tymakbayev/ecakz/raw/main/assets.zip
   wget https://github.com/tymakbayev/ecakz/raw/main/phpmail.zip
   ```

2. **Извлечь и разместить:**
   ```bash
   # Изображения продуктов
   unzip assets.zip -d /app/frontend/public/assets/products/
   
   # PHPMailer
   unzip phpmail.zip -d /app/backend/
   ```

3. **Перезапустить сервисы:**
   ```bash
   sudo supervisorctl restart all
   ```

## ✅ Проверка интеграции

После размещения файлов проверьте:
- [ ] Изображения продуктов загружаются локально
- [ ] Формы отправляют данные на backend
- [ ] Email функциональность работает (если настроен SMTP)
- [ ] Документы благодарственных писем доступны

## 📞 Поддержка

Сайт готов к использованию с интегрированным backend API и структурой для ваших файлов.

**Live URL:** https://459eb95e-546b-4cfc-82dc-5d125dd173af.preview.emergentagent.com