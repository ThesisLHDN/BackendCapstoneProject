import { db } from "../db.js";

export const getWorkspaces = (req, res) => {
  const q =
    "SELECT DISTINCT workspace.id, workspace.wsname FROM works_on JOIN project ON works_on.projectId = project.id RIGHT JOIN workspace ON project.workspaceId = workspace.id WHERE workspace.adminId=? OR works_on.userId=?";
  db.query(q, [req.query.user, req.query.user], (err, data) => {
    if (err) return res.json(err);
    return res.json(data.reverse());
  });
};

export const getWorkspaceById = (req, res) => {
  const q =
    "SELECT w.id, w.wsname, w.descript, w.adminId, u.username, u.email, u.photoURL FROM workspace w JOIN users u ON w.adminId = u.id WHERE w.id=?";
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
    "SELECT * FROM workspace JOIN users ON users.id = workspace.adminId WHERE workspace.id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const getWorkspaceMember = (req, res) => {
  const q =
    "SELECT users.id, users.username, users.email, users.photoURL FROM users JOIN works_on ON users.id = works_on.userId JOIN project ON works_on.projectId = project.id WHERE project.workspaceId=?";
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

    const q = "SELECT id FROM workspace WHERE wsname=? AND createTime=?";
    const values = [req.body.wsname];
    db.query(q, [...values, req.body.createTime], (err, data) => {
      if (err) return res.json(err);
      return res.json(data[0]);
    });
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

export const deleteWorkspace = (req, res) => {
  const q = "DELETE FROM workspace WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Workspace has been deleted successfully.");
  });
};
