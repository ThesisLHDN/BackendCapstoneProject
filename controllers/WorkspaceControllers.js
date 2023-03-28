import { db } from "../db.js";

export const getWorkspaces = (req, res) => {
  const q =
    "SELECT DISTINCT workspace.id, workspace.wsname FROM works_on JOIN project ON works_on.projectId = project.id RIGHT JOIN workspace ON project.workspaceId = workspace.Id WHERE workspace.adminId=? OR works_on.userId=?";
  db.query(q, [req.query.user, req.query.user], (err, data) => {
    if (err) return res.json(err);
    return res.json(data.reverse());
  });
};

export const getWorkspaceById = (req, res) => {
  const q = "SELECT * FROM workspace WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const getLastestWorkspace = (req, res) => {
  const q = "SELECT * FROM workspace WHERE adminId=? ORDER BY id DESC LIMIT 1";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const getAdmin = (req, res) => {
  const q =
    "SELECT * FROM workspace JOIN user ON user.id = workspace.adminId WHERE workspace.id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const getWorkspaceMember = (req, res) => {
  const q =
    "SELECT user.id, user.username, user.email FROM user JOIN works_on ON user.id = works_on.userId JOIN project ON works_on.projectId = project.id WHERE project.workspaceId=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const createWorkspace = (req, res) => {
  const q =
    "INSERT INTO workspace (`wsname`, `createTime`, `adminId`) VALUES (?)";
  const values = [req.body.wsname, req.body.createTime, req.body.adminId];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Workspace has been created successfully.");
  });
};

export const editWorkspace = (req, res) => {
  const q = "UPDATE workspace SET `wsname`=?, `descript`=? WHERE `id`=?";
  const wsId = [req.params.id];
  const values = [req.body.wsname, req.body.descript];
  db.query(q, [...values, wsId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Workspace has been updated successfully.");
  });
};

export const removeWorkspaceMember = (req, res) => {
  const q =
    "DELETE FROM works_on WHERE userId=? AND projectId IN (SELECT id FROM project WHERE workspaceId=?)";
  const values = [req.params.id];
  const wsId = [req.query.wsId];
  db.query(q, [...values, wsId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Workspace member has been deleted successfully.");
  });
};
