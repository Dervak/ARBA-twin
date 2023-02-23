import { Server } from 'socket.io'
import apiAuth from '@/utils/apiAuth'

const chat = apiAuth((req, res) => {
    const io = new Server({})
    io.on('connection', (socket) => {
        console.log('a user connected')
        socket.on('chat message', (msg) => {
            console.log(`received message: ${msg}`)
            io.emit('chat message', msg)
        })
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
    io.attach(req.socket)
    res.status(200).send('Socket.io server listening')
})

export default chat