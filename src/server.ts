import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import foodController from './food.controller'

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))

app.use(foodController)


export default app