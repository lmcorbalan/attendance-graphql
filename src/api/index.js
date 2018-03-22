import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'
import { graphqlExpress } from 'apollo-server-express'

import { customScalarType, customScalarResolvers } from './resources/custom-scalar'
import { playerType, playerResolvers } from './resources/player'
import { sessionType, sessionResolvers } from './resources/session'

const baseSchema = `
  schema {
    query: Query
  }
`

export const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    customScalarType,
    playerType,
    sessionType
  ],
  resolvers: merge(
    {},
    customScalarResolvers,
    playerResolvers,
    sessionResolvers
  )
})

export const graphQLRouter = graphqlExpress((req) => ({
  schema,
  context: {
    req,
    user: {name: 'test'}
  }
}))
