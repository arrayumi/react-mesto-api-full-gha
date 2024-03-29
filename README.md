# Приложение Mesto
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.

## Ссылки на проект:
* Frontend https://arrayumi.mesto.nomoredomains.sbs/
* Backend https://arrayumi.mesto.backend.nomoredomains.sbs/

### Структура проекта:
* /frontend - фронтенд-часть на React
* /backend - API на Express.js

### Функциональность:
*frontend*
* Адаптивная, семантическая верстка по БЭМ
* Регистрация/авторизация пользователей
* Редактирование информации о пользователе
* Валидация форм перед отправкой на сервер
* Добавление/удаление фотографий

*backend*
* Работа с базой данной приложения через роуты
* Регистрация и аутентификация пользователя
* Часть роутов защищена авторизацией через JWT-токен
* Валидация данных
* Сбор логов сервера в формате JSON
* Централизованный обработчик ошибок
* Хранение пароля пользователя в виде хэша с солью
* Поддержка работы с доступом по https
* Безопасное хранение на сервере ключа для генерации JWT-токенов
* Обеспечение безопасности заголовков запросов

### Стек технологий:
`HTML` `CSS` `БЭМ` `React` `Node.js` `express.js` `MongoDB` `Nginx`
