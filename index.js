//declare modules and variables

const express = require('express')
const app = express()
const port = process.env.PORT || 8080

//starting the server
app.listen(port, e => {
    console.log('Listen on port ', port)
})