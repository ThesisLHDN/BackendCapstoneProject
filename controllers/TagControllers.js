import { db } from "../db.js";

export const getTagsByIssue = (req, res) => {
  const q = "SELECT * FROM issue_tag WHERE issueId=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const createTag = (req, res) => {
  const q = "INSERT INTO issue_tag (`tagname`, `issueId`) VALUES (?)";
  const values = [req.body.tagname, req.body.issueId];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Tag has been created successfully.");
  });
};

export const deleteTag = (req, res) => {
  const q = "DELETE FROM issue_tag WHERE tagname=? AND issueId=?";
  db.query(q, [req.query.name, req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Tag has been deleted successfully.");
  });
};
