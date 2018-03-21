import { dropDb } from './helpers'
import { Player } from '../src/api/resources/player/player.model'

export default async (mongoose) => {
  await dropDb(mongoose)
  await Player.insertMany([
    {
      name: 'test name1',
      lastname: 'test lastname1'
    },
    {
      name: 'test name2',
      lastname: 'test lastname2'
    },
    {
      name: 'test name3',
      lastname: 'test lastname3'
    },
    {
      name: 'test name4',
      lastname: 'test lastname4'
    }
  ])
}
