import { db } from "../db.js";

export const addUser = (req, res) => {
  const q = "INSERT INTO user (`id`, `email`, `username`) VALUES (?)";
  const values = [req.body.uid, req.body.email, req.body.displayName];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been added successfully.");
  });
};
