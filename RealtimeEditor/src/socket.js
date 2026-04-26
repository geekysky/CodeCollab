import { io } from "socket.io-client";

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'infinity',
        timeout: 10000,
        transports: ['polling', 'websocket'],
    };

    return io(window.location.origin, options);
}