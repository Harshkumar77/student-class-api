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

classSchema.virtual("newClassApiResponse").get(function () {
  return {
    name: this.name,
    year: this.year,
    classTeacher: this.classTeacher,
    subjects: this.subjects,
    classCode: this.classCode,
  }
})

classSchema.virtual("existingClassApiResponse").get(function () {
  return {
    name: this.name,
    year: this.year,
    classTeacher: this.classTeacher,
    subjects: this.subjects,
    classCode: this.classCode,
    totalStudents: this.totalStudents,
    students: this.students.map((student) => (student as any).apiResponse),
  }
})

classSchema.virtual("miniClassApiResponse").get(function () {
  return {
    name: this.name,
    year: this.year,
    classTeacher: this.classTeacher,
    subjects: this.subjects,
    classCode: this.classCode,
    totalStudents: this.totalStudents,
  }
})

const Class = mongoose.model("Class", classSchema)

export default Class
