import { Session } from './session.model'

const getSession = (_, {id}, {user}) => {
  return Session.findById(id).exec()
}

const allSessions = (_, __, {user}) => {
  console.log('test')
  return Session.find({}).exec()
}

export const sessionResolvers = {
  Query: {
    allSessions,
    Session: getSession
  }
}
