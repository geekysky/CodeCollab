import express from 'express';
const app = express();
import { createServer } from 'http';
import { Server } from 'socket.io';
import ACTIONS from './Actions.js';

const server = createServer(app);
const io = new Server(server);

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],
        };
    });
}

io.on('connection', (socket) => {
    console.log('A user connected with socket id: ', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        console.log(clients);

        for (let i = 0; i < clients.length; i++) {
            const socketId = clients[i].socketId;

            if (!socketId) continue;

            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username: clients[i].username,
                socketId: socket.id,
            })
        }
    })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})