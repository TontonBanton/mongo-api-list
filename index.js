const express = require('express')
const routes = require('./routes/api')

const app = express()

app.use(express.json())
app.use('/api', routes)

app.listen(process.env.PORT || 4000, function(){
  console.log("app listening port 4000")
})