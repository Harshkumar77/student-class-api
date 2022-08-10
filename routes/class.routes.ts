import { Router } from "express"
import Class from "../models/Class"

const classRouter = Router()

classRouter.post("/api/class", async (req, res) => {
  const oldClass = await Class.findOne({ name: req.body.name })
  if (oldClass)
    return res.status(400).send({ message: "This class name is already taken" })
  const newClass = await Class.create(req.body)
  res.status(201).send((newClass as any).newClassApiResponse)
})

classRouter.get("/api/classes", async (req, res) => {
  const classes = await Class.find({})
  const apiResponse = classes.map(
    (_class) => (_class as any).miniClassApiResponse
  )
  res.send(apiResponse)
})

classRouter.get("/api/class/:name", async (req, res) => {
  const _class = await Class.findOne({ name: req.params.name })
  if (!_class)
    return res.status(400).send({
      message: "Incorrect class Name",
    })
  res.send((_class as any).existingClassApiResponse)
})

export default classRouter
