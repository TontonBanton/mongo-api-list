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

app.listen(process.env.PORT || 4000, function(){
  console.log("app listening port 4000")
})