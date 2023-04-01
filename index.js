import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import WorkspaceRoutes from "./routes/WorkspaceRoutes.js";
import ProjectRoutes from "./routes/ProjectRoutes.js";
import SprintRoutes from "./routes/SprintRoutes.js";
import IssueRoutes from "./routes/IssueRoutes.js";
import TagRoutes from "./routes/TagRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(UserRoutes);
app.use(WorkspaceRoutes);
app.use(ProjectRoutes);
app.use(SprintRoutes);
app.use(IssueRoutes);
app.use(TagRoutes);

app.get("/", (req, res) => {
  res.json("This is backend");
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
