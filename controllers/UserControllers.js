import { db } from "../db.js";

export const getUserById = (req, res) => {
  const q = "SELECT * FROM users WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
};

export const addUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id=?";
  db.query(q, [req.body.uid], (err, data) => {
    if (err) return res.json(err);
    if (data.length != 0) return res.json("User exists!");
    else {
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
    }
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

export const getNotiById = (req, res) => {
  const q = "SELECT * FROM notification WHERE receiverId=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const addHours = (date, hours) => {
  const dated = new Date(date);
  dated.setHours(dated.getHours() + hours);
  return dated;
};

export const addNoti = (req, res) => {
  const q = "SELECT * FROM notification WHERE senderName=? AND dateUpdate=?";
  db.query(
    q,
    [
      req.body.senderName,
      new Date(req.body.dateUpdate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    ],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length != 0) return res.json("Noti exists!");

      const q =
        "INSERT INTO notification (`senderName`, `senderAvatar`, `updatedIssue`, `projectKey`, `receiverId`, `type`, `newState`, `dateUpdate`) VALUES (?)";
      const values = [
        req.body.senderName,
        req.body.senderAvatar,
        req.body.updatedIssue,
        req.body.projectKey,
        req.body.receiverId[0],
        req.body.type,
        req.body.newState,
        addHours(req.body.dateUpdate, 7)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        if (req.body.receiverId.length == 1)
          return res.json("Notification has been created successfully.");

        const values = [
          req.body.senderName,
          req.body.senderAvatar,
          req.body.updatedIssue,
          req.body.projectKey,
          req.body.receiverId[1],
          req.body.type,
          req.body.newState,
          new Date(req.body.dateUpdate)
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        ];
        db.query(q, [values], (err, data) => {
          if (err) return res.json(err);
          return res.json("Notification has been created successfully.");
        });
      });
    }
  );
};
