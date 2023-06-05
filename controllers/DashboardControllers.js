import { db } from "../db.js";

export const getWorkload = (req, res) => {
  if (req.query.sprint) {
    const q =
      "SELECT * FROM cycle WHERE id=(SELECT MAX(id) FROM cycle WHERE projectId=?)";
    const values = [req.params.id];
    db.query(q, [...values], (err, data) => {
      if (err) return res.json(err);
      const today = new Date();
      if (data.length != 0) {
        if (data[0].startDate < today && today < data[0].endDate) {
          const q =
            "SELECT issuestatus, COUNT(*) as numbers FROM issue WHERE projectId=? AND cycleId=? GROUP BY issuestatus;";
          const values = [req.params.id, data[0].id];
          db.query(q, [...values], (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
          });
        } else {
          return res.json([]);
        }
      } else {
        return res.json([]);
      }
    });
  } else {
    const q =
      "SELECT issuestatus, COUNT(*) as numbers FROM issue WHERE projectId=? GROUP BY issuestatus;";
    const values = [req.params.id];
    db.query(q, [...values], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }
};

export const getBurndown = (req, res) => {
  const q =
    "SELECT * FROM cycle WHERE id=(SELECT MAX(id) FROM cycle WHERE projectId=?)";
  const values = [req.params.id];
  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err);
    const today = new Date();
    if (data.length != 0) {
      if (data[0].startDate < today && today < data[0].endDate) {
        const startD = new Date(data[0].startDate);
        startD.setDate(startD.getDate());
        const endD = new Date(data[0].endDate);
        endD.setDate(endD.getDate());

        const numberOfDate = (endD - startD) / 86400000;
        const dates = [];
        for (let i = 0; i < numberOfDate; i++) {
          const temp = new Date(data[0].startDate);
          temp.setDate(startD.getDate() + i);
          dates.push(
            new Date(temp).getDate() +
              " " +
              new Date(temp).toLocaleString("en-us", { month: "short" })
          );
        }

        const q =
          "SELECT dateUpdate, pointRemain FROM sprint_log WHERE sprintId=?";
        const values = [data[0].id];
        db.query(q, [...values], (err, data) => {
          if (err) return res.json(err);

          if (data.length != 0) {
            const guidelinePoint = [];
            for (let i = numberOfDate; i > 0; i--)
              guidelinePoint.push(
                (data[0].pointRemain * (i - 1)) / (numberOfDate - 1)
              );

            const remainedPoint = data.map((item) => item.pointRemain);
            return res.json([dates, guidelinePoint, remainedPoint]);
          } else {
            res.json([]);
          }
        });
      } else {
        return res.json([]);
      }
    } else {
      return res.json([]);
    }
  });
};

export const getCumulative = (req, res) => {
  if (req.query.sprint) {
    const q =
      "SELECT * FROM cycle WHERE id=(SELECT MAX(id) FROM cycle WHERE projectId=?)";
    const values = [req.params.id];
    db.query(q, [...values], (err, data) => {
      if (err) return res.json(err);
      const today = new Date();
      if (data.length != 0) {
        if (data[0].startDate < today && today < data[0].endDate) {
          const q = "SELECT * FROM sprint_log WHERE sprintId=?";
          db.query(q, [data[0].id], (err, data) => {
            if (err) return res.json(err);

            const dates = data.map(
              (item) =>
                new Date(item.dateUpdate).getDate() +
                " " +
                new Date(item.dateUpdate).toLocaleString("en-us", {
                  month: "short",
                })
            );

            const todos = data.map(
              (item) =>
                item.issueToDo +
                item.issueInProgress +
                item.issueTesting +
                item.issueDone
            );

            const inprogress = data.map(
              (item) =>
                item.issueInProgress + item.issueTesting + item.issueDone
            );

            const testings = data.map(
              (item) => item.issueTesting + item.issueDone
            );
            const dones = data.map((item) => item.issueDone);

            return res.json([dates, todos, inprogress, testings, dones]);
          });
        } else {
          return res.json([]);
        }
      } else {
        return res.json([]);
      }
    });
  } else {
    const q = "SELECT * FROM project_log WHERE projectId=?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.json(err);

      const dates = data.map(
        (item) =>
          new Date(item.dateUpdate).getDate() +
          " " +
          new Date(item.dateUpdate).toLocaleString("en-us", {
            month: "short",
          })
      );

      // if (dates.length > 20) {
      //   let dated = dates.filter((value, index) => index % 2 == 0);

      //   const todos = data
      //     .map(
      //       (item) =>
      //         item.issueToDo +
      //         item.issueInProgress +
      //         item.issueTesting +
      //         item.issueDone
      //     )
      //     .filter((value, index) => index % 2 == 0);

      //   const inprogress = data
      //     .map(
      //       (item) => item.issueInProgress + item.issueTesting + item.issueDone
      //     )
      //     .filter((value, index) => index % 2 == 0);

      //   const testings = data
      //     .map((item) => item.issueTesting + item.issueDone)
      //     .filter((value, index) => index % 2 == 0);

      //   const dones = data
      //     .map((item) => item.issueDone)
      //     .filter((value, index) => index % 2 == 0);

      //   // console.log([dated, todos, inprogress, testings, dones]);
      //   return res.json([dated, todos, inprogress, testings, dones]);
      // } else {
      //   const todos = data.map(
      //     (item) =>
      //       item.issueToDo +
      //       item.issueInProgress +
      //       item.issueTesting +
      //       item.issueDone
      //   );

      //   const inprogress = data.map(
      //     (item) => item.issueInProgress + item.issueTesting + item.issueDone
      //   );

      //   const testings = data.map((item) => item.issueTesting + item.issueDone);
      //   const dones = data.map((item) => item.issueDone);

      //   return res.json([dates, todos, inprogress, testings, dones]);
      // }

      const todos = data.map(
        (item) =>
          item.issueToDo +
          item.issueInProgress +
          item.issueTesting +
          item.issueDone
      );

      const inprogress = data.map(
        (item) => item.issueInProgress + item.issueTesting + item.issueDone
      );

      const testings = data.map((item) => item.issueTesting + item.issueDone);
      const dones = data.map((item) => item.issueDone);

      return res.json([dates, todos, inprogress, testings, dones]);
    });
  }
};

export const getPerformance = (req, res) => {
  const q =
    "SELECT users.id, users.username, users.photoURL FROM works_on JOIN users ON works_on.userId = users.id WHERE works_on.projectId=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    const memberList = data;

    if (req.query.sprint) {
      const q =
        "SELECT * FROM cycle WHERE id=(SELECT MAX(id) FROM cycle WHERE projectId=?)";
      const values = [req.params.id];
      db.query(q, [...values], (err, data) => {
        if (err) return res.json(err);

        const today = new Date();
        if (data.length != 0) {
          if (data[0].startDate < today && today < data[0].endDate) {
            for (let i = 0; i < memberList.length; i++) {
              const numOfIssue = {
                "To do": [0, 0],
                "In progress": [0, 0],
                Testing: [0, 0],
                Done: [0, 0],
              };
              const q =
                "SELECT issuestatus, COUNT(*) as numbers, SUM(estimatePoint) as points FROM issue WHERE projectId=? AND cycleId=? AND assigneeId=? GROUP BY issuestatus;";
              const values = [req.params.id, data[0].id, memberList[i].id];
              db.query(q, [...values], (err, data) => {
                if (err) return res.json(err);
                for (let i = 0; i < data.length; i++)
                  numOfIssue[data[i].issuestatus] = [
                    data[i].numbers,
                    data[i].points ? data[i].points : 0,
                  ];
                memberList[i] = { ...memberList[i], ...numOfIssue };
                if (i == memberList.length - 1) return res.json(memberList);
              });
            }
          } else {
            return res.json([]);
          }
        } else {
          return res.json([]);
        }
      });
    } else {
      for (let i = 0; i < memberList.length; i++) {
        const numOfIssue = {
          "To do": [0, 0],
          "In progress": [0, 0],
          Testing: [0, 0],
          Done: [0, 0],
        };
        const q =
          "SELECT issuestatus, COUNT(*) as numbers, SUM(estimatePoint) as points FROM issue WHERE projectId=? AND assigneeId=? GROUP BY issuestatus;";
        const values = [req.params.id, memberList[i].id];
        db.query(q, [...values], (err, data) => {
          if (err) return res.json(err);

          for (let i = 0; i < data.length; i++)
            numOfIssue[data[i].issuestatus] = [
              data[i].numbers,
              data[i].points ? data[i].points : 0,
            ];
          memberList[i] = { ...memberList[i], ...numOfIssue };
          if (i == memberList.length - 1) return res.json(memberList);
        });
      }
    }
  });
};
