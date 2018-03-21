import '../src/api/resources/player/player.model'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const removeModel = (mongoose, modelName) => {
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

export const dropDb = (mongoose) => {
  mongoose.modelNames().map((model) => {
    removeModel(mongoose, model)
  })
}
