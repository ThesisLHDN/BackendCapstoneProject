import { db } from "../db.js";

export const getUserById = (req, res) => {
  const q = "SELECT * FROM user WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const addUser = (req, res) => {
  const q = "INSERT INTO user (`id`, `email`, `username`) VALUES (?)";
  const values = [req.body.uid, req.body.email, req.body.displayName];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been added successfully.");
  });
};
