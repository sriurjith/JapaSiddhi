import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

export const initializeSocket = (server: HttpServer): Server => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
        transports: ['websocket', 'polling'],
    });

    io.on('connection', (socket: Socket) => {
        console.log(`✅ Socket Connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`❌ Socket Disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const getSocketIO = (): Server => {
    if (!io) {
        throw new Error('Socket.IO is not initialized.');
    }

    return io;
};