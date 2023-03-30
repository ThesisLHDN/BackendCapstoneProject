import { db } from "../db.js";

export const getSprints = (req, res) => {
  const q = "SELECT * FROM cycle WHERE projectId=?";
  const values = [req.params.pId];
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data.reverse());
  });
};

export const getLastestSprint = (req, res) => {
  const q = "SELECT * FROM cycle WHERE projectId=? ORDER BY id DESC LIMIT 1";
  const values = [req.params.pId];
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const startSprint = (req, res) => {
  const q =
    "INSERT INTO cycle (`cyclename`, `startDate`, `endDate`, `cstatus`, `goal`, `ownerId`, `projectId`) VALUES (?)";
  const values = [
    req.body.cyclename,
    req.body.startDate,
    req.body.endDate,
    req.body.cstatus,
    req.body.goal,
    req.body.ownerId,
    req.body.projectId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Sprint has been created successfully.");
  });
};

export const completeSprint = (req, res) => {
  const q =
    "UPDATE issue SET `cycleId`=? WHERE `issuestatus`!=? AND `cycleId`=?";
  const cid = [req.params.id];
  const values = [1];
  db.query(q, [...values, "Done", ...cid], (err, data) => {
    if (err) return res.json(err);
    const q = "UPDATE cycle SET `cstatus`=? WHERE id=?";
    const values = [0];
    db.query(q, [...values, cid], (err, data) => {
      if (err) return res.json(err);
      return res.json("Sprint has been completed successfully.");
    });
  });
};
