const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const routes = require('./routes')
const initDataBase = require('./startApp/initDataBase')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', routes)
app.use(cors())


const PORT = config.get('port') ?? 8080

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDataBase()
    })
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.yellow('Connected...'))
    app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}...`)))
  } catch (e) {
    console.log(chalk.red(e.message))
    process.exit(1)
  }
}

start()
