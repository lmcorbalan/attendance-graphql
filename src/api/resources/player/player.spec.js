import { Player } from './player.model'
import { runQuery, dropDb } from '../../../../test/helpers'
import { expect } from 'chai'

describe('Player', () => {
  let user
  let players
  const today = new Date

  beforeEach(async () => {
    await dropDb()
    user = {name: 'test user'}
    players = await Player.insertMany([
      {
        name: 'test name1',
        lastname: 'test lastname1',
        birthDate: today,
        positions: ['Flanker', 'Hooker', 'Prop'],
        phoneNumber: '341-123456',
        email: 'test@gmail.com',
        photo: ''
      },
      {
        name: 'test name2',
        lastname: 'test lastname2',
        birthDate: today,
        positions: ['Flanker', 'Hooker', 'Prop'],
        phoneNumber: '341-123456',
        email: 'test@gmail.com',
        photo: ''
      },
      {
        name: 'test name3',
        lastname: 'test lastname3',
        birthDate: today,
        positions: ['Flanker', 'Hooker', 'Prop'],
        phoneNumber: '341-123456',
        email: 'test@gmail.com',
        photo: ''
      },
      {
        name: 'test name4',
        lastname: 'test lastname4',
        birthDate: today,
        positions: ['Flanker', 'Hooker', 'Prop'],
        phoneNumber: '341-123456',
        email: 'test@gmail.com',
        photo: ''
      }
    ])

    // players = await Player.find({}).exec()
  })

  afterEach(async () => {
    await dropDb()
  })

  it('should get one player', async () => {
    let expectedPlayer = players[0];

    const result = await runQuery(`
      query GetPlayerById($id: ID!){
        Player(id: $id) {
          id
          birthDate
          name
          lastname
        }
      }
    `, {id: expectedPlayer.id}, user)

    expect(result.errors).to.not.exist
    expect(result.data.Player).to.be.an('object')
    expect(result.data.Player.id).to.eql(expectedPlayer.id.toString())
    expect(result.data.Player.name).to.eql(expectedPlayer.name)
    expect(result.data.Player.lastname).to.eql(expectedPlayer.lastname)
    expect(result.data.Player.birthDate).to.eql(today.getTime())

  })

  it('should get all players', async () => {
    const result = await runQuery(`
      {
        players: allPlayers {
          id
        }
      }
    `, {}, user)

    expect(result.errors).to.not.exist
    expect(result.data.players.length).to.eql(players.length)
  })
})
