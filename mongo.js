const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://digitalgeniusnm_db_user:${password}@cluster0.few9yyy.mongodb.net/phonebook?appName=Cluster0`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url)
  .then(() => {
    if (process.argv.length === 3) {
      console.log('phonebook:')

      return Person.find({})
        .then(persons => {
          persons.forEach(person => {
            console.log(person.name, person.number)
          })

          mongoose.connection.close()
        })
    }

    if (process.argv.length === 5) {
      const name = process.argv[3]
      const number = process.argv[4]

      const person = new Person({
        name,
        number
      })

      return person.save()
        .then(result => {
          console.log(`added ${result.name} number ${result.number} to phonebook`)
          mongoose.connection.close()
        })
    }

    console.log('Give password as argument, or password, name and number')
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
    mongoose.connection.close()
  })