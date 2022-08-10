import { Express } from "express"
import classRouter from "./class.routes"
import marksRouter from "./marks.routes"
import studentRouter from "./student.routes"
const addRoutes = (app: Express) => {
  app.use(marksRouter)
  app.use(classRouter)
  app.use(studentRouter)
}
export default addRoutes
