import express from 'express'
import dotenv from 'dotenv'
import rootRouter from "./routes/index"
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1', rootRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})