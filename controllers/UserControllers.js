import { db } from "../db.js";

export const getUserById = (req, res) => {
  const q = "SELECT * FROM users WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO users (`id`, `email`, `username`, `photoURL`) VALUES (?)";
  const values = [
    req.body.uid,
    req.body.email,
    req.body.displayName,
    req.body.photoURL,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been added successfully.");
  });
};

export const editUser = (req, res) => {
  const q = "UPDATE users SET `username`=?, `photoURL`=? WHERE `id`=?";
  const uId = [req.params.id];
  const values = [req.body.username, req.body.photoURL];
  db.query(q, [...values, uId], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been updated successfully.");
  });
};
