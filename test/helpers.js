import '../src/api/resources/player/player.model'
import mongoose from 'mongoose'
import config from '~/config'
import { graphql } from 'graphql'
import { schema } from '../src/api'

mongoose.Promise = global.Promise

export const removeModel = (modelName) => {
  const model = mongoose.model(modelName)
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve()
    }
    model.remove((err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export const dropDb = () => {
  return mongoose.connect(config.db.url)
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)))
}

export const runQuery = async (query, variables, user) => {
  return graphql(schema, query, {}, {user}, variables)
}
