const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const userRouter = require("./routes/userRoutes");
const chatRoutes = require("./Routes/ChatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const http = require("http");

// Configure dotenv
dotenv.config();

// Create an express app
const app = express();

// Use middleware
app.use(morgan("dev"));
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());


// Define PORT
const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    // Create an HTTP server
    let server = http.createServer(app);

    // Listen to the PORT
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    // Initialize Socket.IO
    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:3000",
      },
    });
    // Socket.IO connection event
    io.on("connection", (socket) => {
      console.log("connected to socket-io", socket.id);
      socket.on("setup", (userData) => {
        socket.userId = userData._id
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
      });
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room:" + room);
      });

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
      
      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
// Define routes
// app.route('/').get(home);
// app.use('/api/v1/mentors',mentorRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/chat',chatRoutes);
app.use('/api/v1/message',messageRoutes)

