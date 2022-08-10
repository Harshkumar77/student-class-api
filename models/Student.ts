import mongoose from "mongoose"
import { expirationDate } from "../utils/Date"
import Class from "./Class"

export const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  class: { ref: "Class", type: mongoose.Types.ObjectId, required: true },
  accountCreated: {
    type: Date,
    default: Date.now(),
  },
  expirationDate : {
    type : Date ,
    default : expirationDate()
  },
  studentId: { type: String, required: true },
  marks : {
    type : Map<String , Number>,
    default : new Map<String,Number>(),
    required : true
  },
  password : {
    type : String
  } , 
  rollNumber : {
    type : Number,
    required : true
  }
})

studentSchema.virtual("apiResponse").get(function() {
  return {
    name : this.name,
    studentId : this.studentId,
    rollNumber : this.rollNumber,
    marks : this.marks,
    dob : this.dateOfBirth
  }
})

const Student = mongoose.model("Student", studentSchema)

export default Student
