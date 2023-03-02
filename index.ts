import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import route from './src/routes'

dotenv.config()

const api = express()

const { PORT } = process.env

api.use(cors())
api.use(express.json())
api.use(route)


api.listen(PORT, () => {
  console.log(` 🏀 Api Running Free: ${PORT}`)
})


export default api