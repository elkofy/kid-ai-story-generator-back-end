const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/test', (req, res) => {
    const mysql = require('mysql');

  res.send('test');
});


app.listen(3000)

