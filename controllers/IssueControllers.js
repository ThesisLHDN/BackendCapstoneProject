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

export const getIssueById = (req, res) => {
  const q = "SELECT * FROM issue WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
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
  const q =
    "cId" in req.body
      ? "UPDATE issue SET `cycleId`=?, `issuestatus`=? WHERE id=?"
      : "UPDATE issue SET `issuestatus`=?, `descript`=?, `dueDate`=?, `priority`=?, `assigneeId`=?, `estimatePoint`=? WHERE id=?";
  const values =
    "cId" in req.body
      ? [req.body.cId, req.body.status]
      : [
          req.body.issuestatus,
          req.body.descript,
          req.body.dueDate,
          req.body.priority,
          req.body.assigneeId,
          req.body.estimatePoint,
        ];
  db.query(q, [...values, req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(req.body);
  });
};

export const deleteIssue = (req, res) => {
  const q = "DELETE FROM issue WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Issue has been deleted successfully.");
  });
};
