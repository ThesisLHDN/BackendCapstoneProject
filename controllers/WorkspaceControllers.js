import { db } from "../db.js";

export const getWorkspaces = (req, res) => {
  const q = "SELECT * FROM workspace WHERE adminId=?";
  db.query(q, [req.query.user], (err, data) => {
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

export const createWorkspace = (req, res) => {
  const q =
    "INSERT INTO workspace (`wsname`, `createTime`, `adminId`) VALUES (?)";
  const values = [req.body.wsname, req.body.createTime, req.body.adminId];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Workspace has been created successfully.");
  });
};
