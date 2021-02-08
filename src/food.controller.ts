import express from 'express'

const app = express()

app.get('/', async (req, res) => {
  console.log('Get all foods...')
})

app.get('/:day', async (req, res) => {
  console.log('Get all foods for day X...')
})

export default app
