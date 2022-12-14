import "dotenv/config"
import express from "express"
import { configureApp } from "./config/express.config"
import addRoutes from "./routes"

const app = express()

configureApp(app)

addRoutes(app)

process.on("uncaughtException", function (err) {
  console.error(err)
  console.log("Node NOT Exiting...")
})
