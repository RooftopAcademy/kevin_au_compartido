const express = require('express')
const cors =require('cors')

const app = express()
const path = require('path')

app.use(express.json())
app.use(cors({ origin: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(3000)

console.log("Server Started")
