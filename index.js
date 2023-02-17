const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const { Server } = require('socket.io')
const { saveMessage } = require('./utils/message')
const { saveUser, userLeave } = require('./utils/user')
const io = new Server(server)
const cors = require('cors')

app.use(cors())

// serving client
app.use('/', express.static('./public'))

io.on('connection', (socket) => {
  // save user & send user info
  socket.on('user', (username) => {
    const users = saveUser(socket.id, username)
    socket.join('ichat')
    io.to('ichat').emit('users', users)
  })

  // recieve private message
  socket.on(
    'private message',
    ({ from, fromUsername, to, toUsername, message }) => {
      io.to([from, to]).emit('private message', {
        from,
        fromUsername,
        to,
        toUsername,
        message,
      })
    }
  )

  // user disconnected
  socket.on('disconnect', () => {
    const users = userLeave(socket.id)
    io.to('ichat').emit('users', users)
  })

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`)
  })
})

// usernames middleware
io.use((socket, next) => {
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error('Invalid username'))
  }

  socket.usernames = username
  next()
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`listening on ${port}`))
