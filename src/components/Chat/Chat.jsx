import io from 'socket.io-client'

const Chat = () => {
    const socket = io('/api/chat')
    console.log(socket)
    socket.on('connect', () => {
        console.log('Connected to Socket.io server')
    })
    socket.on('chat message', (message) => {
        console.log(`Received message: ${message}`)
    })
    socket.emit('chat message', 'Hello, world!')
}

export default Chat