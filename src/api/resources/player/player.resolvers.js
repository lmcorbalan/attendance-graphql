import { Player } from './player.model'

const getPlayer = (_, {id}, {user}) => {
  return Player.findById(id).exec()
}

const allPlayers = (_, __, {user}) => {
  return Player.find({}).exec()
}

const resolverDate = () => {

}

export const playerResolvers = {
  Query: {
    allPlayers,
    Player: getPlayer
  }
}
