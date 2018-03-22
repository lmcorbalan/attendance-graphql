import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'
import { graphqlExpress } from 'apollo-server-express'

import { customScalarType, customScalarResolvers } from './resources/custom-scalar'
import { playerType, playerResolvers } from './resources/player'

const baseSchema = `
  schema {
    query: Query
  }
`

export const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    customScalarType,
    playerType
  ],
  resolvers: merge(
    {},
    customScalarResolvers,
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
