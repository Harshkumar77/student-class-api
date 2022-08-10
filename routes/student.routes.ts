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
  // const apiResponse = {
  //   name: newStudent.name,
  //   rollNumber: newStudent.rollNumber,
  //   studentId: newStudent.studentId,
  // }
  // res.status(201).send(apiResponse)
  res.status(201).send((newStudent as any).apiResponse)
  _class.students.push(newStudent)
  _class.save()
})

studentRouter.post("/api/student/activate", async (req, res) => {
  if (!req.body.studentId || !req.body.oldPassword || !req.body.newPassword)
    return res.status(400).send({
      message: "Please provide old password , new password and studentId",
    })
})

export default studentRouter
