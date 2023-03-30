import { db } from "../db.js";

export const getIssuesByProject = (req, res) => {
  const q = "SELECT * FROM issue WHERE projectId=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const getIssueBySprint = (req, res) => {
  const q = "SELECT * FROM issue WHERE cycleId=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const createIssue = (req, res) => {
  const q =
    "INSERT INTO issue (`issuename`, `createTime`, `reporterId`, `projectId`, `issuestatus`, `cycleId`, `issueType`, `epicId`) VALUES (?)";
  const values = [
    req.body.issuename,
    req.body.createTime,
    req.body.reporterId,
    req.body.projectId,
    req.body.issuestatus,
    req.body.cycleId,
    req.body.issueType,
    req.body.epicId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Issue has been created successfully.");
  });
};

export const updateIssue = (req, res) => {
  const q = "UPDATE issue SET `cycleId`=?, `issuestatus`=? WHERE id=?";
  const values = [req.body.cId, req.body.status];
  db.query(q, [...values, req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Issue has been updated successfully.");
  });
};
