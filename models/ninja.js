const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  rank: {
    type: String,
    required: [true, 'Rank is required']
  },
  available:{
    type: Boolean,
    default: false
  }
})