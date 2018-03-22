import { Session } from './session.model'
import { runQuery, dropDb } from '../../../../test/helpers'
import { expect } from 'chai'

describe('Session', () => {
  let user
  let sessions
  const today = new Date

  beforeEach(async () => {
    await dropDb()
    user = {name: 'test user'}
    sessions = await Session.insertMany([
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
  })

  afterEach(async () => {
    await dropDb()
  })

  it('should get one session', async () => {
    let expectedSession = sessions[0];

    const result = await runQuery(`
      query GetSessionById($id: ID!){
        Session(id: $id) {
          id
          date
          place
        }
      }
    `, {id: expectedSession.id}, user)

    expect(result.errors).to.not.exist
    expect(result.data.Session).to.be.an('object')
    expect(result.data.Session.id).to.eql(expectedSession.id.toString())
    expect(result.data.Session.place).to.eql(expectedSession.place)
    expect(result.data.Session.date).to.eql(today.getTime())

  })

  it('should get all sessions', async () => {
    const result = await runQuery(`
      {
        sessions: allSessions {
          id
        }
      }
    `, {}, user)

    expect(result.errors).to.not.exist
    expect(result.data.sessions.length).to.eql(sessions.length)
  })
})
