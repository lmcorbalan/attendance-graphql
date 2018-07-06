import { Player } from './player.model'
import { Session } from '../session/session.model'

const getPlayer = (_, {id}, {user}) => {
  return Player.findById(id).exec()
}

const allPlayers = (_, __, {user}) => {
  return Player.find({}).exec()
}

const addAttendace = async (_, {playerId, input}, {user}) => {
  const player = await Player.findById(playerId)
  player.attendances.push(input)

  return player.save()
}

const updateAttendace = async (_, {playerId, input}, {user}) => {
  const {id, type} = input
  const player = await Player.findById(playerId)

  player.attendances.id(id).type = type

  return player.save()
}

const removeAttendace = async (_, {playerId, input}, {user}) => {
  const player = await Player.findById(playerId)
  player.attendances.id(input).remove()

  return player.save()
}

export const playerResolvers = {
  Query: {
    allPlayers,
    Player: getPlayer
  },

  Mutation: {
    addAttendace,
    updateAttendace,
    removeAttendace
  },

  Player: {
    attendances(player, args) {
      let attendances = player.attendances;

      if (args.sessionId) {
        attendances = attendances.filter(attendance => (
          attendance.session === args.sessionId
        ));
      }

      return attendances;
    }
  },

  Attendance: {
    async session({session}) {
      return Session.findById(session)
    }
  }
}
