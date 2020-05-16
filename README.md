# ШРИ ДЗ: CI (клиентское приложение и сервер)

## Дз по воркерам

Использовал [Workbox](https://developers.google.com/web/tools/workbox/guides/get-started), и [cra-append-sw](https://www.npmjs.com/package/cra-append-sw) для того, чтобы без `npm run eject` менять файл сервис-воркера, который создаётся с помощью `Create React App`.

Не получилось использовать `process.env.NODE_ENV` в коде сервис-воркера, так чтобы он работал и для `dev` и `prod` режимов, поэтому завёл переменную `__IS_DEV__` в которой указывал для какой среды сейчас этот код сервис-воркера.

### Выбранные стратегии кэширования:

1. [Cache First (Cache Falling Back to Network)](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network):
   1. для всех картинок(в том числе и favicon) на сайте, инвалидация каждый месяц. Так как эти ассеты меняются довольно редко
   1. для всех используемых шрифтов без указания ограничения времени жизни. Т.к. шрифты не менялись вообще ни разу с момента начала написания этого проекта
1. [Stale-While-Revalidate](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate):
   1. для всей статики на сайте (html / css / js), так как хочется чтобы сайт грузился максимально быстро, но и был всегда актуален. В `index.html` указываются стили с хэшом чанков, поэтому он тоже постоянно меняется при изменении js/css
1. [Network First (Network Falling Back to Cache)](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#network_first_network_falling_back_to_cache):
   1. для всех запросов к `api`, чтобы была возможность отобразить данные из кэша при отключенном интернете

---

## Дз по тестам

Описание дз по тестам находится в файле [TESTS_README.md](TESTS_README.md)

## Структура папок в репозитории

Клиентское приложение лежит в папке [front](front).

Сервер лежит в папке [server](server).

## Необходимая версия node

`v10.15.2`

## Как запустить

Чтобы запустить API сервер, который ещё раздаёт статику сбилженного реакт-приложения:

1. Перейти в папку [server](server)

2. Добавить файл `.env` с таким содержимым:

```
# API
API_TOKEN=${здесь ваш токен для запросов к апи полученный отсюда: https://hw.shri.yandex/}
```

3. Выполнить в терминале:

```
npm install
npm run server
```

Сервер по дефолту запустится на `9999` порту. [http://localhost:9999/](http://localhost:9999/)
