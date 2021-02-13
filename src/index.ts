import app from './server'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`> Server is listening on port ${PORT}`)
})
