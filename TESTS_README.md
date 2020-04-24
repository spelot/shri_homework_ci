# Домашнее задание по тестам

## Сценарии интеграционных тестов:

1. Правильная отрисовка(сравнением скриншотов) страниц на десктопе и мобильном устройстве (главная, страница настроек, страница деталей билда)
1. Наличие правильных текстовых значений у элементов на страницах (value у инпутов, заголовки, описание коммита и тд)
1. Появление popup при нажатии на кнопку "Run build" на главной

## Логические блоки приложения:

1. Компоненты
1. Action Creators
1. Редьюсеры
1. Утилитные функции
1. Серверная часть

## Сценарии модульных тестов:

1. Каждый компонент должен рендериться без ошибок
1. Action Creators
1. Редьюсеры
1. Утилитные функции
1. Наличие `.env` файла и не пустого `API_TOKEN` в нём

## Запуск тестов

1. Для запуска модульных тестов клиентского приложения надо перейти в папку [front](front). Выполнить инструкции в [front/README.md](front/README.md). И после этого выполнить в консоли:

```
npm test
```

либо если нужен подробный вывод по каждому тесту, то:

```
npm test -- --verbose
```

2. Для запуска модульных тестов сервера надо перейти в папку [server](server). Выполнить инструкции в [server/README.md](server/README.md). И после этого выполнить в консоли:

```
npm test
```

3. Для запуска интеграционных тестов надо перейти в папку [server](server). Выполнить инструкции в [server/README.md](server/README.md). И запустить сервер. **[NOTION] Чтобы тесты запустились, необходимо использовать такой `apiToken`:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU5Nzk2OTQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3BlbG90IiwidXJuOmdpdGh1Yjp1cmwiOiJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL3NwZWxvdCIsIm5iZiI6MTU4NzMxNDI3OSwiZXhwIjoxNTg5OTA2Mjc5LCJpc3MiOiJTaHJpLUhvbWV3b3JrIiwiYXVkIjoiU2hyaS1Ib21ld29yayJ9.xU2VamkBGPD791iY8k0HShu1FrYhbBYZKS4iDc_GEVk`.

Далее необходимо **выполнить установку** `selenium-standalone` глобально(если он у вас ещё не установлен) и **запустить его** по инструкции отсюда: [https://github.com/gemini-testing/hermione#prerequisites](https://github.com/gemini-testing/hermione#prerequisites). Если в кратце, то надо выполнить следующие команды в консоли:

```
npm install selenium-standalone@latest -g
selenium-standalone install && selenium-standalone start
```

И если у вас появляется ошибка `No Java runtime present, requesting install.`, то ещё нужно установить [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html).

После того, как запустился сервер выполнить в консоли:

```
npm run e2e-tests
```

4. Если по какой-то причине нужно обновить скриншоты, то сначала надо выполнить:

```
npm run e2e-tests:update
```

5. К сожалению, я не понял как в интеграционных тестах по-правильному замокать данные, чтобы тесты выполнялись при любом `apiToken`. Но с другой стороны, как мне кажется, у такого подхода есть свои плюсы – все данные реальные, и получаются с серверов, соответственно проверяется вся цепочка вызовов. И возможно на реальном проекте таким образом будет даже проще поддерживать актуальность тестов после различных доработок. Или я не прав?
