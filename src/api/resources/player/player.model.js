import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
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
  }
}, {timestamps: true})

export const Player = mongoose.model('player', playerSchema)
