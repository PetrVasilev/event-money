
# Серверная часть проекта для хакатона ВКонтакте Якутск

Чтобы запустить проект:
- Скачайте проект 
```sh
$ git clone https://github.com/PetrVasilev/event-money.git
```
- Перейдите в каталок серверной части
```sh
$ cd server
```
- Установите все npm пакеты
```sh
$ npm install
```
или 

```sh
$ yarn install
```
- Настройте .env

> PORT=4000
> USER_REFRESH_TOKEN_SECRET=USERREFRESHTOKENSECRET
> USER_ACCESS_TOKEN_SECRET=USERACCESSTOKENSECRET
> ADMIN_REFRESH_TOKEN_SECRET=ADMINREFRESHTOKENSECRET
> ADMIN_ACCESS_TOKEN_SECRET=ADMINACCESSTOKENSECRET
> DATABASE_URL="postgresql://pass:pass2020@localhost:5432/eventmoney"

- Запустите проект
```sh
$ npm start
```
или 

```sh
$ yarn start
```
