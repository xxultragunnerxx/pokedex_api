require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next) {
  const bearerToken = req.get('Authorization').split(' ')[1]
  const apiToken = process.env.API_TOKEN

  console.log('validate bearer token middleware')

  if (bearerToken !== apiToken){
    return res.status(401.json({error: 'Unauthorized Request.'}))
  }
  // move to the next middleware
  next()
})

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

function handleGetTypes(req,res){
  res.json(validTypes)
}

app.get('/types', handleGetTypes)

function handleGetPokemon(req,res) {
  res.send('Hello, Pokemon!')
}

app.get('/pokemon', handleGetPokemon)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
