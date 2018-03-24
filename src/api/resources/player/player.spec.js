import { Player } from './player.model'
import { Session } from '../session/session.model'
import { runQuery, dropDb } from '../../../../test/helpers'
import { expect } from 'chai'

describe('Player', () => {
  let user
  let players
  let session
  const today = new Date

  const helpers = {
    addAttendace(player, session) {

      const attendace = {
        playerId: player.id,
        attendace: {
          session: session.id,
          type: 'YES'
        }
      }

      return runQuery(`
        mutation AddAttendace($playerId: ID!, $attendace: NewAttendance!) {
          addAttendace(playerId: $playerId, input: $attendace) {
            id
            name
            attendances {
              id
              type
              session {
                place
                date
                type
              }
            }
          }
        }
      `, attendace, {name: 'test user'})
    }
  }

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

    session = await Session.create({
      place: 'LOCAL',
      date: today,
      type: 'HIGH'
    })
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

  it('should add a player\' attendace', async () => {
    const firstPlayer = players[0]
    const result = await helpers.addAttendace(firstPlayer, session)

    expect(result.errors).to.not.exist
    expect(result.data.addAttendace).to.be.an('object')
    expect(result.data.addAttendace.id).to.eql(firstPlayer.id.toString())
    expect(result.data.addAttendace.attendances).to.be.an('array')
    expect(result.data.addAttendace.attendances.length).to.eql(1)
    expect(result.data.addAttendace.attendances[0].type).to.eql('YES')
    expect(result.data.addAttendace.attendances[0].session).to.be.an('object')
    expect(result.data.addAttendace.attendances[0].session.place).to.eql('LOCAL')
    expect(result.data.addAttendace.attendances[0].session.type).to.eql('HIGH')
    expect(result.data.addAttendace.attendances[0].session.date).to.eql(today.getTime())
  })

  it('should update a player\' attendace', async () => {
    const firstPlayer = players[0]
    const playerWithAttendances = await helpers.addAttendace(firstPlayer, session)
    const attendace = playerWithAttendances.data.addAttendace.attendances[0]

    const data = {
      playerId: firstPlayer.id,
      input: {
        id: attendace.id,
        type: "NO"
      }
    }

    const result = await runQuery(`
      mutation UpdateAttendace($playerId: ID!, $input: UpdatedAttendance!) {
        updateAttendace(playerId: $playerId, input: $input) {
          id
          name
          attendances {
            id
            type
            session {
              place
              date
              type
            }
          }
        }
      }
    `, data, {name: 'test user'})

    expect(result.errors).to.not.exist
    expect(result.data.updateAttendace).to.be.an('object')
    expect(result.data.updateAttendace.id).to.eql(firstPlayer.id.toString())
    expect(result.data.updateAttendace.attendances).to.be.an('array')
    expect(result.data.updateAttendace.attendances.length).to.eql(1)
    expect(result.data.updateAttendace.attendances[0].type).to.eql('NO')
    expect(result.data.updateAttendace.attendances[0].session).to.be.an('object')
    expect(result.data.updateAttendace.attendances[0].session.place).to.eql('LOCAL')
    expect(result.data.updateAttendace.attendances[0].session.type).to.eql('HIGH')
    expect(result.data.updateAttendace.attendances[0].session.date).to.eql(today.getTime())
  })

  it('should remove a player\' attendace', async () => {
    const firstPlayer = players[0]
    const playerWithAttendances = await helpers.addAttendace(firstPlayer, session)
    const attendace = playerWithAttendances.data.addAttendace.attendances[0]

    const data = {
      playerId: firstPlayer.id,
      input: attendace.id
    }

    const result = await runQuery(`
      mutation RemoveAttendace($playerId: ID!, $input: ID!) {
        removeAttendace(playerId: $playerId, input: $input) {
          id
          name
          attendances {
            id
            type
            session {
              date
              type
            }
          }
        }
      }
    `, data, {name: 'test user'})

    expect(result.errors).to.not.exist
    expect(result.data.removeAttendace).to.be.an('object')
    expect(result.data.removeAttendace.id).to.eql(firstPlayer.id.toString())
    expect(result.data.removeAttendace.attendances).to.be.an('array')
    expect(result.data.removeAttendace.attendances.length).to.eql(0)
  })
})
