import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import WorkspaceRoutes from "./routes/WorkspaceRoutes.js";
import ProjectRoutes from "./routes/ProjectRoutes.js";
import SprintRoutes from "./routes/SprintRoutes.js";
import IssueRoutes from "./routes/IssueRoutes.js";
import TagRoutes from "./routes/TagRoutes.js";
import DashboardRoutes from "./routes/DashboardRoutes.js";
import { Server } from "socket.io";

const app = express();

// HANDLE BACKEND
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(UserRoutes);
app.use(WorkspaceRoutes);
app.use(ProjectRoutes);
app.use(SprintRoutes);
app.use(IssueRoutes);
app.use(TagRoutes);
app.use(DashboardRoutes);

app.get("/", (req, res) => {
  res.json("This is backend");
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});

// HANDLE SOCKET IO
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId != socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId == userId);
};

const addHours = (date, hours) => {
  date.setHours(date.getHours() + hours);
  return date;
};

io.on("connection", (socket) => {
  // console.log("Connected to socket io");
  // console.log(onlineUsers);

  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id);
    onlineUsers = onlineUsers.filter((user) => user.userId != null);
    // console.log(onlineUsers);
  });

  socket.on(
    "updateIssue",
    ({
      senderId,
      senderName,
      senderAvatar,
      issueId,
      updatedIssue,
      projectId,
      projectKey,
      receiverId,
      type,
      newState,
      dateUpdate,
    }) => {
      const receiver = (
        receiverId.length == 1
          ? [getUser(receiverId[0])]
          : [getUser(receiverId[0])].concat([getUser(receiverId[1])])
      ).filter((user) => user?.userId != senderId);

      receiverId = receiverId.filter((userId) => userId != senderId);

      io.to(receiver[0]?.socketId).emit("getNotification", {
        senderName,
        senderAvatar,
        updatedIssue,
        projectKey,
        receiverId,
        type,
        newState,
        dateUpdate,
      });
      if (receiver.length == 2) {
        io.to(receiver[1]?.socketId).emit("getNotification", {
          senderName,
          senderAvatar,
          updatedIssue,
          projectKey,
          receiverId,
          type,
          newState,
          dateUpdate,
        });
      }
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);
