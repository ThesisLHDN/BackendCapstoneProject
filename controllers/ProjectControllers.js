import { db } from "../db.js";

export const getProjects = (req, res) => {
  const q =
    req.query.user == ""
      ? "SELECT p.id, p.pname, u.username FROM project p JOIN users u ON p.ownerId = u.id WHERE workspaceId=?"
      : "SELECT project.id, project.pname, users.username, users.email FROM project JOIN users ON project.ownerId = users.id JOIN works_on ON project.id = works_on.projectId WHERE project.workspaceId=? AND works_on.userId=?";
  const values = [req.params.id];
  db.query(q, [...values, req.query.user], (err, data) => {
    if (err) return res.json(err);
    return res.json(data.reverse());
  });
};

export const getProjectById = (req, res) => {
  const q =
    "SELECT p.id, p.pname, p.pkey, p.ownerId, p.workspaceId, w.wsname, w.adminId, u.username, u.email FROM project p JOIN workspace w ON p.workspaceId = w.id JOIN users u ON w.adminId = u.id WHERE p.id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const getProjectMembers = (req, res) => {
  const q =
    "SELECT users.id, users.username, users.email FROM works_on JOIN users ON works_on.userId = users.id WHERE works_on.projectId=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const createProject = (req, res) => {
  const q =
    "INSERT INTO project (`pname`, `pkey`, `createTime`, `ownerId`, `workspaceId`) VALUES (?)";
  const values = [
    req.body.pname,
    req.body.pkey,
    req.body.createTime,
    req.body.ownerId,
    req.body.workspaceId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    // return res.json("Project has been created successfully.");
    const q = "SELECT id FROM project WHERE pname=? AND createTime=?";
    const values = [req.body.pname];
    db.query(q, [...values, req.body.createTime], (err, data) => {
      if (err) return res.json(err);
      return res.json(data[0]);
    });
  });
};

export const addProjectMember = (req, res) => {
  const q = "SELECT id FROM users WHERE email=?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.json("User does not exist!");

    const q = "INSERT INTO works_on (`userId`, `projectId`) VALUES (?)";
    const values = [data[0].id, req.body.projectId];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      console.log("AAAA");
      return res.json("Member has been added successfully.");
    });
  });
};

export const editProject = (req, res) => {
  const q = "UPDATE project SET `pname`=?, `pkey`=?, `ownerId`=? WHERE `id`=?";
  const pId = [req.params.id];
  const values = [req.body.pname, req.body.pkey, req.body.ownerId];
  db.query(q, [...values, pId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Project has been updated successfully.");
  });
};

export const deleteProject = (req, res) => {
  const q = "DELETE FROM project WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Project has been deleted successfully.");
  });
};

export const deleteProjectMember = (req, res) => {
  const q = "DELETE FROM works_on WHERE projectId=? AND userId=?";
  db.query(q, [req.params.id, req.query.uid], (err, data) => {
    if (err) return res.json(err);
    return res.json("Member has been deleted successfully.");
  });
};
