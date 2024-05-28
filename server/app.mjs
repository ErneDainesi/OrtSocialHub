import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'

const app = express()
configDotenv()
const port = process.env.PORT

app.use(cors())

app.get('/', (req, res) => {
  res.json({msg: 'Hello World!'})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
