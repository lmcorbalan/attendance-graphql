import { Session } from './session.model'

const getSession = (_, {id}, {user}) => {
  return Session.findOne({id: id, active: true}).exec()
}

const allSessions = (_, __, {user}) => {
  return Session.find({active: true}).exec()
}

const newSession = (_, {input}) => {
  return Session.create(input)
}

const updateSession = (_, {input}) => {
  const {id, ...update} = input

  return Session.findByIdAndUpdate(id, update, {new: true}).exec()
}

const removeSession = (_, {id}) => {
  return Session.findByIdAndUpdate(id, {active: false}, {new: true}).exec()
}

export const sessionResolvers = {
  Query: {
    allSessions,
    Session: getSession
  },

  Mutation: {
    newSession,
    updateSession,
    removeSession
  }
}
