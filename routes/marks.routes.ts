import { Router } from "express"
import Class from "../models/Class"
import Student from "../models/Student"

const marksRouter = Router()

marksRouter.get("/api/marks", async (req, res) => {
  if (!req.query.class || !req.query.subject)
    return res.status(400).send({
      message: "Please provide class and subject",
    })
  const _class = await Class.findOne({ name: req.query.class })
  if (!_class)
    return res.status(404).send({
      message: "Class provided doesn't exists",
    })
  if (!_class.subjects.includes(req.query.subject as string))
    return res.status(404).send({
      message: "Subject provided doesn't exists",
    })
  const response = {
    [`${_class.name}`]: {
      Year: _class.year,
      Class_teacher: _class.classTeacher,
      Subject_list: _class.subjects,
      Students: _class.students.map((student) => ({
        [student.studentId]: {
          name: student.name,
          marks: student.marks.get(req.query.subject as string),
        },
      })),
    },
  }
  res.send(response)
})

marksRouter.post("/api/marks/:id", async (req, res) => {
  const student = await Student.findOne({ studentId: req.params.id })

  if (!student)
    return res.status(404).send({
      message: "Please provide valid student Id",
    })

  const _class = await Class.findById(student.class)
  if (!_class) return res.status(500)

  const subjects = _class.subjects

  const idx_student = _class.students.findIndex(
    (_) => _.studentId == student.studentId
  )

  const marksProvided = new Map<string, number>(Object.entries(req.body))

  subjects.forEach((subject) => {
    if (marksProvided.has(subject))
      student.marks.set(subject, marksProvided.get(subject))
  })
  res.send(student.marks)
  _class.students[idx_student] = student

  student.save()
  _class.save()
})

marksRouter.get("/api/marks/:id", async (req, res) => {
  const student = await Student.findOne({ studentId: req.params.id })
  if (!student)
    return res.status(404).send({
      message: "Please provide valid student Id",
    })

  res.send(student.marks)
})

export default marksRouter
