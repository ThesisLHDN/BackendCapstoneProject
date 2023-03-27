import { db } from "../db.js";

export const getProjects = (req, res) => {
  const q =
    "SELECT p.id, p.pname, u.username FROM project p JOIN user u ON p.ownerId = u.id WHERE workspaceId=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data.reverse());
  });
};

export const createProject = (req, res) => {
  const q =
    "INSERT INTO project (`pname`, `createTime`, `ownerId`, `workspaceId`) VALUES (?)";
  const values = [
    req.body.pname,
    req.body.createTime,
    req.body.ownerId,
    req.body.workspaceId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Project has been created successfully.");
  });
};
