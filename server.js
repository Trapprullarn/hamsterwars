import express from 'express'
import cors from 'cors'
const app = express()
import hamsters from './routes/hamsters.js'
const PORT = process.env.PORT || 1337
import path from 'path'
const staticFolder = path.join(__dirname, 'public')

//middleware
//CORS
app.use( cors() )
app.use( express.json() )

// Parse request body
app.use( express.urlencoded({ extended: true }) )

//logger
app.use( (req, res, next) => {
    console.log(`Logger: ${req.method} ${req.url}`, req.body)
    next()
})

//serve static files
app.use( express.static(staticFolder) )

//routes
app.use('/hamsters', hamsters)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
})