// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const cors = require("cors");
// const http = require('http');
// const { Server } = require('socket.io');
// const ACTIONS = require('./Actions.js');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// const app = express();
// const server = http.createServer(app); // Use this for Socket.io

// const io = new Server(server, {
//     cors: {
//         origin: "*", // Allow all origins (Change this in production)
//         methods: ["GET", "POST"]
//     }
// });

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

// // Middleware setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // Catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // Error handler
// app.use(function (err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
// });

// // Static file serving for React frontend
// app.use(express.static('build'));
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// const userSocketMap = {};

// function getAllConnectedClients(roomId) {
//     return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//         (socketId) => ({
//             socketId,
//             username: userSocketMap[socketId],
//         })
//     );
// }

// // Socket.io connection handling
// io.on('connection', (socket) => {
//     console.log('Socket connected:', socket.id);

//     // socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
//     //     userSocketMap[socket.id] = username;
//     //     socket.join(roomId);

//     //     const clients = getAllConnectedClients(roomId);
//     //     clients.forEach(({ socketId }) => {
//     //         io.to(socketId).emit(ACTIONS.JOINED, {
//     //             clients,
//     //             username,
//     //             socketId: socket.id,
//     //         });
//     //     });
//     // });

//     // socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
//     //     socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
//     // });

//     // socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
//     //     io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
//     // });

//     // socket.on('disconnecting', () => {
//     //     const rooms = [...socket.rooms];
//     //     rooms.forEach((roomId) => {
//     //         socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
//     //             socketId: socket.id,
//     //             username: userSocketMap[socket.id],
//     //         });
//     //     });
//     //     delete userSocketMap[socket.id];
//     //     socket.leave();
//     // });
// });

// // Start server correctly with Socket.io
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./Actions.js");
const { v4: uuidv4 } = require("uuid");
const Room = require("./models/Room");


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const roomRoutes = require("./routes/room");

const app = express();
const server = http.createServer(app); // Use this for Socket.io

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ensure frontend matches this
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/getRoom", roomRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Static file serving for React frontend
app.use(express.static("build"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//NEW CODE
const users = {}; // Store socketId: { uuid, username }
// io.on("connection", (socket) => {
//   socket.on('host', () => {
//     const code = uuidv4();
//     socket.join(code);
//     io.to(code).emit('broadcast code', code);
//   });

//   socket.on("join-room", ({ roomId, uuid, username }) => {
//     users[socket.id] = { uuid, username };
//     socket.join(roomId);
//     const clientsInRoom = Array.from(
//       io.sockets.adapter.rooms.get(roomId) || []
//     ).map((id) => ({
//       socketId: id,
//       username: users[id]?.username || "Unknown",
//     }));
//     io.to(roomId).emit("update-user-list", clientsInRoom);
//   });

//   socket.on("disconnect", () => {
//     const roomIds = [...socket.rooms].filter((r) => r !== socket.id);
//     delete users[socket.id];

//     roomIds.forEach((roomId) => {
//       const clientsInRoom = Array.from(
//         io.sockets.adapter.rooms.get(roomId) || []
//       ).map((id) => ({
//         socketId: id,
//         username: users[id]?.username || "Unknown",
//       }));

//       io.to(roomId).emit("update-user-list", clientsInRoom);
//     });
//     console.log(`❌ Client disconnected: ${socket.id}`);
//   });
// });

//NEW CODE STARTS
io.on("connection", (socket) => {
  socket.on("host", async () => {
    const code = uuidv4();
    socket.join(code);

    try {
      const roomExists = await Room.findOne({ roomId: code });
      if (!roomExists) {
        const room = new Room({ roomId: code });
        await room.save();
        console.log("Room saved in DB:", code);
      }

      io.to(code).emit("broadcast code", code);
    } catch (error) {
      console.error("Error saving room to DB:", error);
    }
  });

  socket.on("join-room", async ({ roomId, uuid, username }) => {
    socket.join(roomId);
    users[socket.id] = { uuid, username };

    try {
      await Room.updateOne(
        { roomId },
        { $addToSet: { users: { uuid, username } } }
      );
    } catch (error) {
      console.error("Error adding user to room:", error);
    }

    const clientsInRoom = Array.from(
      io.sockets.adapter.rooms.get(roomId) || []
    ).map((id) => ({
      socketId: id,
      username: users[id]?.username || "Unknown",
    }));
    io.to(roomId).emit("update-user-list", clientsInRoom);
  });
});
//NEW CODE ENDS

// Start server correctly with Socket.io
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
