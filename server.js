const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const path = require('path')

connectDB()

app.use(cors())
//Initialize Middleware
app.use(express.json({ extended: false }))



app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

//Things to be changed:
//Above one
//Configs
//
