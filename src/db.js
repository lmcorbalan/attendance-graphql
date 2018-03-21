import mongoose from 'mongoose'
import appConfig from './config'

import seed from '../utils/seed'

mongoose.Promise = global.Promise

export const connect = (config = appConfig) => {
  return mongoose.connect(config.db.url)
    .then(() => {
      if (config.seedDb) {
        seed(mongoose)
      }
    })
}
