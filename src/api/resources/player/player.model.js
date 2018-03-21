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

  photo: {
    type: String
  }
}, {timestamps: true})

export const Player = mongoose.model('player', playerSchema)
