import { randomBytes } from "crypto"
import mongoose from "mongoose"
import { studentSchema } from "./Student"

export const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  students: {
    type: [studentSchema],
    default: [],
  },
  year: {
    type: Number,
    required: true,
  },
  classTeacher: {
    required: true,
    type: String,
  },
  subjects: {
    type: [String],
    default: [],
  },
  totalStudents: {
    type: Number,
    default: 0,
  },
  classCode: {
    type: String,
    default: randomBytes(5).toString("hex").slice(0, 3).toUpperCase(),
    unique: true,
    required: true,
  },
})

const Class = mongoose.model("Class", classSchema)

export default Class
