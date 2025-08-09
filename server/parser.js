function parser(cmd, socket) {
    const trimCmd = cmd.trim().toLowerCase()

    if (trimCmd.startsWith('get')) {
        get(trimCmd, socket)
    }
    else if (trimCmd.startsWith('set')) {
        set(trimCmd, socket)
    }
    else if (trimCmd.startsWith('del')) {
        del(trimCmd, socket)
    }
}
const store = {}

async function set(args, socket) {
    const [, key , value] = args.split(' ')
    store[key] = value
    socket.write(`OK\r\n`)
}

async function get(args, socket) {
    const splitArr = args.split(' ')
    const getItem = splitArr[1]
    const value = store[getItem]
    if (!value) return socket.write(`$-1\r\n`);
    else return socket.write(`$${value.length}\r\n${value}\r\n`);
}

async function del(args, socket) {
    const splitArr = args.split(' ')
    const key = splitArr[1]
    if (!store[key]) return socket.write(`(integer) 0\r\n`)
    else {
        delete store[key]
        return socket.write(`(integer) 1\r\n`);
    }
}

export default parser