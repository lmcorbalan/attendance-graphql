import express from 'express'
import setupMiddware from './middleware'
import { graphQLRouter } from './api'
import { graphiqlExpress } from 'apollo-server-express'
import { connect } from './db'
// import { signin, protect } from './api/modules/auth'

// Declare an app from express
const app = express()

setupMiddware(app)
connect()
// setup basic routing for index route

// app.use('/signin', signin)
app.use('/graphql', graphQLRouter)
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }))

// catch all
app.all('*', (req, res) => {
  res.status(404).send("Sorry can't find that!")
})

export default app
