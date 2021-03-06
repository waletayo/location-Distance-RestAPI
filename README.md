# Location-RestAPI

Location RestAPI Calculate Distance Between two Coordinates


## Installation

Use the Node Package Manager to install packages:

```
npm install --save

```

## SetUp

Use command below to create a new Postgres Database

```
createdb databasename

```

## Database Configuration 

Create a [.env] file in the root folder

Add the line below
```
DATABASE_URL_TEST='postgres://postgres:password@localhost/distanceApp-test'
DATABASE_URL_DEV='postgres://postgres:password@localhost/distanceApp-test'

```
##export DBUrl 
Use the command Below

for developemt environment run

```
export DATABASE_URL_DEV='postgres://postgres:password@localhost/databasename-dev'
```
for test environment run 

```
export DATABASE_URL_TEST='postgres://postgres:password@localhost/databasename-test'

```
Run the following command to migrate our db

```
npm run db:migrate

```
## Server

To spin up the server run the following command

```
export DATABASE_URL_DEV='postgres://postgres:password@localhost/databasename-dev'
npm run start
```

## Test 

To run the test 

```
export DATABASE_URL_TEST='postgres://postgres:password@localhost/databasename-test'
npm run test
```

## Postman Documentation

https://documenter.getpostman.com/view/4683690/TzeXk7Qp


## Technology Used

[Nodejs]('https://nodejs.org/en/docs/')
[Postgres]('https://www.postgresql.org/')
[Sequelize]('http://sequelize.org/') 


