const express = require('express')
const routes = require('./routes/api')
const mongoose = require('mongoose')

const app = express()

//DB connect
mongoose.connect("mongodb://localhost/ninjago")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

app.use(express.json())
app.use('/api', routes)

//Middleware for post
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message })
})

app.listen(process.env.PORT || 4000, function(){
  console.log("app listening port 4000")
})