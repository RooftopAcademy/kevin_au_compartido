import express from 'express'
import cors from 'cors'
import path from 'path'

import productsRoutes from './routes/products.routes'

const app = express()

app.use(express.json())
app.use(cors({ origin: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.use('/api/products', productsRoutes)

export default app
