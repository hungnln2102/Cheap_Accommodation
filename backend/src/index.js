require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const eventBus = require('./events/eventBus');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Trong thực tế nên giới hạn domain của frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Khởi tạo các Route cơ bản
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Real-time Event (Tracking online users via WebSocket)
let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  console.log(`User connected. Total: ${activeUsers}`);
  
  // Phát event cập nhật số lượng cho toàn bộ client
  io.emit('online_users', activeUsers);

  socket.on('disconnect', () => {
    activeUsers--;
    console.log(`User disconnected. Total: ${activeUsers}`);
    io.emit('online_users', activeUsers);
  });
});

// Khởi động server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`🚀 Backend (Hybrid Architecture) is running on port ${PORT}`);
  console.log(`👉 Event Bus is initialized.`);
});
