import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  place: {
    type: String,
    required: [true, "Session Place is required"]
  },
  date: {
    type: Date,
    required: [true, "Session Date is required"]
  },
  type: {
    type: String,
    required: [true, "Session Type is required"]
  }
})

export const Session = mongoose.model('session', sessionSchema)
