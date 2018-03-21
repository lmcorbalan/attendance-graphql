import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'
import { graphqlExpress } from 'apollo-server-express'

import { playerType, playerResolvers } from './resources/player'

const baseSchema = `
  schema {
    query: Query
  }
`

export const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    playerType
  ],
  resolvers: merge(
    {},
    playerResolvers
  )
})

export const graphQLRouter = graphqlExpress((req) => ({
  schema,
  context: {
    req,
    user: {name: 'test'}
  }
}))
