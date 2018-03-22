import { dropDb } from './helpers'
import { Player } from '../src/api/resources/player/player.model'
import { Session } from '../src/api/resources/session/session.model'

const today = new Date

export default async (mongoose) => {
  await dropDb(mongoose)

  await Player.insertMany([
    {
      name: 'test name1',
      lastname: 'test lastname1',
      birthDate: today,
      positions: ["WING", "CENTRE", "FLYHALF", "SCRUMHALF","EIGHT", "FLANKER", "HOOKER", "PROP"],
      phoneNumber: '341-123456',
      email: 'test@gmail.com',
      photo: ''
    },
    {
      name: 'test name2',
      lastname: 'test lastname2',
      birthDate: today,
      positions: ["WING", "CENTRE", "FLYHALF", "SCRUMHALF","EIGHT", "FLANKER", "HOOKER", "PROP"],
      phoneNumber: '341-123456',
      email: 'test@gmail.com',
      photo: ''
    },
    {
      name: 'test name3',
      lastname: 'test lastname3',
      birthDate: today,
      positions: ["WING", "CENTRE", "FLYHALF", "SCRUMHALF","EIGHT", "FLANKER", "HOOKER", "PROP"],
      phoneNumber: '341-123456',
      email: 'test@gmail.com',
      photo: ''
    },
    {
      name: 'test name4',
      lastname: 'test lastname4',
      birthDate: today,
      positions: ["WING", "CENTRE", "FLYHALF", "SCRUMHALF","EIGHT", "FLANKER", "HOOKER", "PROP"],
      phoneNumber: '341-123456',
      email: 'test@gmail.com',
      photo: ''
    }
  ])

  await Session.insertMany([
    {
      place: 'LOCAL',
      date: today,
      type: 'HIGH'
    },
    {
      place: 'LOCAL',
      date: today,
      type: 'HIGH'
    },
    {
      place: 'LOCAL',
      date: today,
      type: 'HIGH'
    }
  ])

}
