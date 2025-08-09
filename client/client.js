import net from 'net'
const socket = net.createConnection({ host: 'localhost', port : 6379,})

process.stdin.on('data', (chunk) => {
    socket.write(chunk)
})

socket.on('data', (chunk) => {
    console.log(chunk.toString());
})

socket.on('error', () => {
    console.log('server lost');
})