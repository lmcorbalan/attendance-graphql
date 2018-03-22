import mongoose, { Schema } from 'mongoose'

const attendanceSchema = new Schema({
  session: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'session'

  },
  type: {
    type: String,
    required: true
  }
})

const playerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Player's name is required"]
  },

  lastname: {
    type: String,
    required: [true, "Player's lastname is required"]
  },

  birthDate: Date,

  positions: [String],

  phoneNumber: String,

  email: String,

  photo: {
    type: String
  },

  attendances: [attendanceSchema]

}, {timestamps: true})

export const Player = mongoose.model('player', playerSchema)
