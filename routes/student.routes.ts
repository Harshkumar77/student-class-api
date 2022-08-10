import { Router } from "express"
import Class from "../models/Class"
import Student from "../models/Student"
import { hash } from "bcrypt"
import { dateIsValid } from "../utils/Date"

const studentRouter = Router()

studentRouter.post("/api/student", async (req, res) => {
  if (!req.body.class || !req.body.name || !req.body.dob || !req.body.password)
    return res.status(400).send({
      message:
        "Please Provide class , student name , dob (YYYY-MM-DD) and password",
    })
  if (!dateIsValid(req.body.dob))
    return res.status(400).send({
      message: "Format dob correctly (YYYY-MM-DD)",
    })
  const _class = await Class.findOne({ name: req.body.class })
  if (!_class)
    return res.status(400).send({
      message: "Please provide correct class",
    })
  _class.totalStudents++
  const marks = new Map<String, Number>()
  _class.subjects.forEach((subject) => marks.set(subject, -1))
  console.log(typeof new Date(req.body.dob))
  const newStudent = await Student.create({
    name: req.body.name,
    class: _class.id,
    dateOfBirth: new Date(req.body.dob),
    rollNumber: _class.totalStudents,
    studentId: `${_class.classCode}_${_class.totalStudents}`,
    password: await hash(req.body.password, 4),
    marks,
  })
  res.status(201).send((newStudent as any).apiResponse)
  _class.students.push(newStudent)
  _class.save()
})

studentRouter.get("/api/student/:id", async (req, res) => {
  const student = await Student.findOne({ studentId: req.params.id })
  if (!student) return res.status(400).send({ message: "Invalid student Id" })
  res.send((student as any).apiResponse)
})

export default studentRouter
