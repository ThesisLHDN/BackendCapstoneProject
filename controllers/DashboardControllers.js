import { db } from "../db.js";

export const getWorkload = (req, res) => {
  if (req.query.sprint) {
    const q =
      "SELECT * FROM capstone.cycle WHERE id=(SELECT MAX(id) FROM cycle WHERE projectId=?)";
    const values = [req.params.id];
    db.query(q, [...values], (err, data) => {
      if (err) return res.json(err);
      const today = new Date();
      if (data[0].startDate < today && today < data[0].endDate) {
        const q =
          "SELECT issuestatus, COUNT(*) as numbers FROM capstone.issue WHERE projectId=? AND cycleId=? GROUP BY issuestatus;";
        const values = [req.params.id, data[0].id];
        db.query(q, [...values], (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
        });
      } else {
        return res.json([]);
      }
    });
  } else {
    const q =
      "SELECT issuestatus, COUNT(*) as numbers FROM capstone.issue WHERE projectId=? GROUP BY issuestatus;";
    const values = [req.params.id];
    db.query(q, [...values], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }
};
