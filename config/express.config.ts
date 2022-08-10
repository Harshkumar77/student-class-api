import mongoose from "mongoose"
import express, { Express } from "express"
import morgan from "morgan"
import addRoutes from "../routes"

export const configureApp = (app: Express) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(morgan("dev"))
  app.use(express.static("dist"))

  const { DATABASE_URL, PORT } = process.env

  if (!DATABASE_URL || !PORT) throw Error("Check enviornment variables")

  app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`)
  )

  addRoutes(app)

  mongoose.connect(DATABASE_URL, (err) => {
    if (err) console.error(err.message)
    else console.log("Connected to database")
  })
}
