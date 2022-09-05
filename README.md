<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
</div>

<br/>

# Description

Valex simulates an API that manages a benefit card. The API is responsible for creating, reloading, activating, as well as processing purchases.

</br>

## Features

- Get the card **balance** and **transaction**
- **Creates** cards
- **Activate** / **Block** / **Unblock** a card
- **Recharges** a card
- Make card **payments**

</br>

## API Reference

### Get card balance and transaction

```http
GET /card/view/:cardId
```

#### Request:

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card id |

<!-- `Number Format: "1111 1111 1111 1111"`

`Expiration Date Format: "MM/YY"` -->

#### Response:

```json
{
  "balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
}
```

#

### Create a card

```http
POST /card/:employeeId
```

#### Request:

| Params       | Type      | Decription                |
| ------------ | --------- | ------------------------- |
| `employeeId` | `integer` | **Required**. employee id |

####

| Headers  | Type     | Decription            |
| -------- | -------- | --------------------- |
| `apiKey` | `string` | **Required**. api key |

####

| Body   | Type     | Description             |
| :----- | :------- | :---------------------- |
| `type` | `string` | **Required**. card type |

Valid types: `[groceries, restaurant, transport, education, health]`

</br>

#### Response:

```json
{
  "employeeId": 3,
  "number": "866304372177",
  "cardholderName": "ANA C D MOREIRA",
  "securityCode": "745",
  "expirationDate": "09/27",
  "isVirtual": false,
  "isBlocked": false,
  "type": "groceries"
}
```

#

### Activate a card

```http
PUT /card/active/:cardId
```

#### Request:

| Params   | Type     | Decription            |
|----------|----------|-----------------------|
| `cardId` | `string` | **Required**. card id |


| Body           | Type     | Decription                       |
|----------------|----------|----------------------------------|
| `password`     | `string` | **Required**. card password      |
| `securityCode` | `string` | **Required**. card security code |

Password length: 4

Cvc length: 3

#

### Block a card

```http
PUT /card/block/:cardId
```

#### Request:

| Params   | Type     | Decription            |
|----------|----------|-----------------------|
| `cardId` | `string` | **Required**. card id |


| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |


#

### Unblock a card

```http
PUT /card/unblock/:cardId
```

#### Request:

| Params   | Type     | Decription            |
|----------|----------|-----------------------|
| `cardId` | `string` | **Required**. card id |

| Body       | Type     | Decription                  |
|------------|----------|-----------------------------|
| `password` | `string` | **Required**. card password |

#

### Recharge a card

```http
POST /card/charge/:cardId
```

#### Request:

| Headers  | Type     | Decription            |
|----------|----------|-----------------------|
| `apiKey` | `string` | **Required**. api key |

####

| Body     | Type     | Decription                    |
|----------|----------|-------------------------------|
| `amount` | `string` | **Required**. recharge amount |


#

### Card payment

```http
POST /purchase/:cardId/:businessId
```

#### Request:

| Params       | Type     | Decription                |
|--------------|----------|---------------------------|
| `cardId`     | `string` | **Required**. card id     |
| `businessId` | `string` | **Required**. business id |

####

| Body       | Type     | Decription                    |
|------------|----------|-------------------------------|
| `password` | `string` | **Required**. card password   |
| `amount`   | `string` | **Required**. recharge amount |

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:4000`

`CRYPTR_KEY = any string`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/lucasborges24/projeto18-valex-back
```

Go to the project directory

```bash
  cd projeto18-valex/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  cd src/database
```

```bash
  bash ./create-database
```

```bash
  cd ../..
```

Start the server

```bash
  npm start
```

</br>

## Author

[![gitHub](https://img.shields.io/badge/-GitHub-181717?logo=gitHub&logoColor=white&style=for-the-badge)](https://github.com/lucasborges24)
[![LinkedIn][linkedin-shield]][linkedin-url]
[![AGPL License](https://img.shields.io/badge/-Instagram-E4405F?logo=instagram&logoColor=white&style=for-the-badge)](https://www.instagram.com/lucas__fisica/)

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/lucas-b-barbosa-12a157216/
