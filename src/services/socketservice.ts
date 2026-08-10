import { io, Socket } from 'socket.io-client';

class SocketService {

    private socket: Socket | null = null;

    connect(token?: string) {

        if (this.socket?.connected) {
            return;
        }

        this.socket = io('http://10.0.2.2:5000', {

            transports: ['websocket'],

            autoConnect: true,

            reconnection: true,

            reconnectionAttempts: Infinity,

            reconnectionDelay: 1000,

            auth: {
                token,
            },

        });

        this.socket.on('connect', () => {

            console.log(
                '✅ Socket Connected',
                this.socket?.id,
            );

        });

        this.socket.on('disconnect', () => {

            console.log(
                '❌ Socket Disconnected',
            );

        });

    }

    disconnect() {

        this.socket?.disconnect();

    }

    getSocket(): Socket {

        if (!this.socket) {

            throw new Error(
                'Socket not connected',
            );

        }

        return this.socket;

    }

}

export default new SocketService();