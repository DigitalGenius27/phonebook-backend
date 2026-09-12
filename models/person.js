const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: value => /^\d{2,3}-\d+$/.test(value),
      message: props => `${props.value} is not a valid phone number`
    }
  }
})

module.exports = mongoose.model('Person', personSchema)