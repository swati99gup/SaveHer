import dotenv from "dotenv";
dotenv.config();
import fcmRoutes
from "./routes/fcm.js";
import http from "http";
import aiRoutes from "./routes/ai.js";
import { Server } from "socket.io";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";
import sosRoutes from "./routes/sos.js";
import contactRoutes from "./routes/contact.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SafeHer API Running");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
import authRoutes from "./routes/auth.js";

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sos", sosRoutes);
app.use(
  "/api/contacts",
  contactRoutes
);
app.use(
  "/api/ai",
  aiRoutes
);
app.use(
  "/api/fcm",
  fcmRoutes
);
const io = new Server(server, {

  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {

  console.log(
    "User Connected:",
    socket.id
  );

  socket.on(
    "send-location",

    (data) => {

      console.log(
        "Live Location:",
        data
      );
    }
  );

  socket.on(
    "disconnect",

    () => {

      console.log(
        "User Disconnected"
      );
    }
  );
});
server.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );
});