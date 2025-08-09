import net from 'net'
import parser from './parser.js'

const server = net.createServer(socket=>{
    console.log('Client connected...');
    
    socket.on('data',(chunk)=>{
        const cmd = chunk.toString()
        parser(cmd, socket)
    })
})

server.listen(6379,()=>console.log('server listen : 6379'))