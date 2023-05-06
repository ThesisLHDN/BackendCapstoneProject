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
  const q = "SELECT COUNT(id) as NumOfIssue FROM issue WHERE projectId=?";
  const values = [req.body.projectId];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);

    const numOfIssues = data[0].NumOfIssue;
    const q =
      "SELECT COUNT(id) as NumOfSprIssue FROM issue WHERE projectId=? AND cycleId=?";
    db.query(q, [...values, req.body.cycleId], (err, data) => {
      if (err) return res.json(err);

      const q =
        "INSERT INTO issue (`issueindex`, `issuename`, `createTime`, `reporterId`, `projectId`, `issuestatus`, `cycleId`, `issueorder`, `issueType`, `epicId`) VALUES (?)";
      const values = [
        numOfIssues + 1,
        req.body.issuename,
        req.body.createTime,
        req.body.reporterId,
        req.body.projectId,
        req.body.issuestatus,
        req.body.cycleId,
        data[0].NumOfSprIssue,
        req.body.issueType,
        req.body.epicId,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Issue has been created successfully.");
      });
    });
  });
};

export const updateIssue = (req, res) => {
  if ("source" in req.body) {
    // Case: move qua lai giua 2 cai sprint
    if (req.body.source.droppableId != req.body.destination.droppableId) {
      // Lay ra ds issue trong cai sprint
      const p = "SELECT * FROM issue WHERE cycleId=? AND projectId=?";
      const vals = [req.body.cId];
      db.query(p, [...vals, req.body.pId], (err, data) => {
        if (err) return res.json(err);
        // Sort lai cai ds
        const iss = data.sort((a, b) => {
          return a.issueorder < b.issueorder
            ? -1
            : a.issueorder > b.issueorder
            ? 1
            : 0;
        });
        // Update tung cai issue mot cho issueorder tang len 1
        for (let i = req.body.destination.index; i < data.length; i++) {
          const p = "UPDATE issue SET `issueorder`=? WHERE id=?";
          const vals = [iss[i].issueorder + 1];
          db.query(p, [...vals, iss[i].id], (err, data) => {
            if (err) return res.json(err);
          });
        }
      });

      const m = "SELECT * FROM issue WHERE cycleId=? AND projectId=?";
      const val = [req.body.source.droppableId];
      db.query(m, [...val, req.body.pId], (err, data) => {
        if (err) return res.json(err);
        // Sort lai cai ds
        const iss = data.sort((a, b) => {
          return a.issueorder < b.issueorder
            ? -1
            : a.issueorder > b.issueorder
            ? 1
            : 0;
        });
        // Update tung cai issue mot cho issueorder giam xuong 1
        for (let i = req.body.source.index + 1; i < data.length; i++) {
          const p = "UPDATE issue SET `issueorder`=? WHERE id=?";
          const vals = [iss[i].issueorder - 1];
          db.query(p, [...vals, iss[i].id], (err, data) => {
            if (err) return res.json(err);
          });
        }
      });
    } else {
      if (req.body.source.index > req.body.destination.index) {
        // Lay ra ds issue trong cai sprint
        const p = "SELECT * FROM issue WHERE cycleId=? AND projectId=?";
        const vals = [req.body.cId];
        db.query(p, [...vals, req.body.pId], (err, data) => {
          if (err) return res.json(err);
          // Sort lai cai ds
          const iss = data.sort((a, b) => {
            return a.issueorder < b.issueorder
              ? -1
              : a.issueorder > b.issueorder
              ? 1
              : 0;
          });
          // Update tung cai issue mot cho issueorder tang len 1
          for (
            let i = req.body.destination.index;
            i <= req.body.source.index - 1;
            i++
          ) {
            if (iss[i].id == req.params.id) continue;
            const p = "UPDATE issue SET `issueorder`=? WHERE id=?";
            const vals = [iss[i].issueorder + 1];
            db.query(p, [...vals, iss[i].id], (err, data) => {
              if (err) return res.json(err);
            });
          }
        });
      } else if (req.body.source.index < req.body.destination.index) {
        // Lay ra ds issue trong cai sprint
        const p = "SELECT * FROM issue WHERE cycleId=? AND projectId=?";
        const vals = [req.body.cId];
        db.query(p, [...vals, req.body.pId], (err, data) => {
          if (err) return res.json(err);
          // Sort lai cai ds
          const iss = data.sort((a, b) => {
            return a.issueorder < b.issueorder
              ? -1
              : a.issueorder > b.issueorder
              ? 1
              : 0;
          });
          // Update tung cai issue mot cho issueorder tang len 1
          for (
            let i = req.body.source.index + 1;
            i <= req.body.destination.index;
            i++
          ) {
            if (iss[i].id == req.params.id) continue;
            console.log(iss[i]);
            const p = "UPDATE issue SET `issueorder`=? WHERE id=?";
            const vals = [iss[i].issueorder - 1];
            db.query(p, [...vals, iss[i].id], (err, data) => {
              if (err) return res.json(err);
            });
          }
        });
      }
    }
  }

  const q =
    "source" in req.body
      ? "UPDATE issue SET `cycleId`=?, `issuestatus`=?, `issueorder`=? WHERE id=?"
      : "descript" in req.body
      ? "UPDATE issue SET `issuestatus`=?, `descript`=?, `dueDate`=?, `priority`=?, `assigneeId`=?, `estimatePoint`=? WHERE id=?"
      : "dueDate" in req.body
      ? "UPDATE issue SET `cycleId`=?, `issuestatus`=?, `createTime`=?, `dueDate`=? WHERE id=?"
      : "UPDATE issue SET `cycleId`=?, `issuestatus`=? WHERE id=?";
  const values =
    "source" in req.body
      ? [req.body.cId, req.body.status, req.body.destination.index]
      : "descript" in req.body
      ? [
          req.body.issuestatus,
          req.body.descript,
          req.body.dueDate,
          req.body.priority,
          req.body.assigneeId,
          req.body.estimatePoint,
        ]
      : "dueDate" in req.body
      ? [req.body.cId, req.body.status, req.body.startDate, req.body.dueDate]
      : [req.body.cId, req.body.status];
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

export const filterIssues = (req, res) => {
  const temp = req.query.sprint
    ? "SELECT * FROM issue WHERE projectId=? AND cycleId=? "
    : "SELECT * FROM issue WHERE projectId=? ";
  var k = "";
  var v = [];
  for (const key in req.body) {
    if (req.body[key] == "") continue;
    k +=
      key == "status"
        ? "AND issuestatus=? "
        : key == "type"
        ? "AND issueType=? "
        : "AND priority=? ";
    v.push(req.body[key]);
  }
  const q = temp + k;
  const values = !req.query.sprint
    ? v.length == 1
      ? [req.params.id, v[0]]
      : v.length == 2
      ? [req.params.id, v[0], v[1]]
      : [req.params.id, v[0], v[1], v[2]]
    : v.length == 1
    ? [req.params.id, req.query.sprint, v[0]]
    : v.length == 2
    ? [req.params.id, req.query.sprint, v[0], v[1]]
    : [req.params.id, req.query.sprint, v[0], v[1], v[2]];
  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const sortIssues = (req, res) => {
  const q = req.query.sprint
    ? "SELECT * FROM issue WHERE projectId=? AND cycleId=? "
    : "SELECT * FROM issue WHERE projectId=? ";
  const values = req.query.sprint
    ? [req.params.id, req.query.sprint]
    : [req.params.id];
  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err);
    if (req.body.sort == "Assignee") {
      data.sort((a, b) =>
        a.assigneeId > b.assigneeId ? -1 : b.assigneeId > a.assigneeId ? 1 : 0
      );
    } else if (req.body.sort == "Priority") {
      const cri = { High: 1, Medium: 2, Low: 3 };
      data.sort((a, b) =>
        cri[a.priority] > cri[b.priority]
          ? 1
          : cri[b.priority] > cri[a.priority]
          ? -1
          : 0
      );
    } else if (req.body.sort == "Type") {
      const cri = { story: 1, task: 2, bug: 3 };
      data.sort((a, b) =>
        cri[a.issueType] >= cri[b.issueType]
          ? 1
          : cri[b.issueType] >= cri[a.issueType]
          ? -1
          : 0
      );
    } else if (req.body.sort == "Status") {
      const cri = { "To do": 1, "In progress": 2, Testing: 3, Done: 4 };
      data.sort((a, b) =>
        cri[a.issuestatus] >= cri[b.issuestatus]
          ? 1
          : cri[b.issuestatus] >= cri[a.issuestatus]
          ? -1
          : 0
      );
    }
    return res.json(data);
  });
};
