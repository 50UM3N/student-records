# Student Records

Simple Web Application that offer you to add, edit and search a student' name, degree, email, phone and his/her image using Node.js and mongodb

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You have to install [Node.js](https://nodejs.org/en/) in your machine.


### Installing

After installing node clone the repo by using git

```
git clone https://github.com/50UM3N/student-records.git
                        or 
git clone git@github.com:50UM3N/student-records.git
```

Or you can download the zip file.

Then open cmd or git bash on the project folder to install some modules that I used to build this project 

[Express Js](https://expressjs.com/) For server framework
```
npm i express
```
[DotEnv](https://www.npmjs.com/package/dotenv) For loads environment variables from a .env file into process.env 
```
npm i dotenv
```
[EJS](https://ejs.co/) (Embedded JavaScript templating) For use server side javascript in clint side
```
npm i ejs
```
[Express Flash](https://www.npmjs.com/package/express-flash) For display flash messages in express application
```
npm i express-flash
```
[Express Session](https://www.npmjs.com/package/express-session) For use the express flash
```
npm i express-session
```
[Mongoose](https://mongoosejs.com/) For mongodb connection
```
npm i mongoose
```
[Nodemon](https://www.npmjs.com/package/nodemon) For automatically restart the server as a dev dependency (optional)
```
npm i --sav-dev nodemon
```


### Setting Database

For the database I use [mongodb](https://www.mongodb.com/) [Atlas](https://www.mongodb.com/cloud/atlas). But you can use the local also.

Rename the file .env_sample to .env then replace "connection string" to your connection string

Example
```
MONGO_URL=mongodb+srv://dbUser:youruser@cluster0-kfx8y.mongodb.net/test?retryWrites=true&w=majority
```

## Running the App

If you install nodemon the you can use. (devStart script is already added to the package.json)

```
npm run devStart
```
or

```
node index.js
```

## Preview

<img src="preview/preview.gif" alt="Preview Image">

## Live Demo
For deploy the project I use [heroku](https://heroku.com) 

[Student Records](https://soumen-student-records.herokuapp.com/)

## Built With

* [Node Js](https://nodejs.org/en/) - The Backend
* [NPM](https://www.npmjs.com/) - Dependency Management
* [GIT](https://git-scm.com/) - Used for version control
* [Heroku](https://heroku.com) - Used to Deploy Node.js applications

