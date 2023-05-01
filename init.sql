DROP SCHEMA IF EXISTS capstone;
CREATE SCHEMA capstone;

USE capstone;

CREATE TABLE user (
  id        CHAR(28)      NOT NULL    PRIMARY KEY,
  email     VARCHAR(128)  NOT NULL,
  username  VARCHAR(128)
);

CREATE TABLE notification (
  id        INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  content   TEXT          NOT NULL,
  link      VARCHAR(128),
  userId    CHAR(28)      NOT NULL,
  FOREIGN KEY (userId) REFERENCES user (id) ON UPDATE CASCADE
);

CREATE TABLE workspace (
  wid          INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  wsname      VARCHAR(128)  NOT NULL,
  descript    MEDIUMTEXT,
  createTime  DATETIME      NOT NULL,
  adminId     CHAR(28)      NOT NULL,
  FOREIGN KEY (adminId) REFERENCES user (id) ON UPDATE CASCADE
);

CREATE TABLE project (
  pid          INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  pname       VARCHAR(128)  NOT NULL,
  pkey        VARCHAR(16),
  createTime  DATETIME      NOT NULL,
  ownerId     CHAR(28)      NOT NULL,
  workspaceId INT           NOT NULL,
  FOREIGN KEY (ownerId) REFERENCES user (id) ON UPDATE CASCADE,
  FOREIGN KEY (workspaceId) REFERENCES workspace (wid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE works_on (
  userId      CHAR(28)    NOT NULL,
  projectId   INT         NOT NULL,
  PRIMARY KEY (userId, projectId),
  FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (projectId) REFERENCES project (pid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE cycle (
  id        INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  cyclename VARCHAR(128)  NOT NULL,
  startDate DATE          NOT NULL,
  endDate   DATE          NOT NULL,
  cstatus   INT           NOT NULL,
  goal      MEDIUMTEXT,
  ownerId   CHAR(28),
  projectId INT,
  FOREIGN KEY (ownerId) REFERENCES user (id) ON UPDATE CASCADE,
  FOREIGN KEY (projectId) REFERENCES project (pid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE epic (
  id        INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  epicname  VARCHAR(128)  NOT NULL,
  startDate DATE          NOT NULL,
  endDate   DATE,
  projectId INT
);

INSERT INTO cycle (id, cyclename, startDate, endDate, cstatus) VALUES ('0', 'Backlog', '0001-01-01', '9999-12-31', -1);
INSERT INTO epic (id, epicname, startDate) VALUES ('0', 'Default', '0001-01-01');

CREATE TABLE issue (
  id            INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  issuename     VARCHAR(128)  NOT NULL,
  createTime    DATETIME      NOT NULL,
  reporterId    CHAR(28)      NOT NULL,
  projectId     INT           NOT NULL,
  issuestatus   VARCHAR(16)   NOT NULL,
  cycleId       INT           NOT NULL,
  issueType     VARCHAR(16)   NOT NULL,
  descript      LONGTEXT,
  priority      VARCHAR(16),
  dueDate       DATETIME,
  estimatePoint INT,
  assigneeId    CHAR(28),
  epicId        INT,
  parentId      INT,
  FOREIGN KEY (reporterId) REFERENCES user (id) ON UPDATE CASCADE,
  FOREIGN KEY (projectId) REFERENCES project (pid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (cycleId) REFERENCES cycle (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (assigneeId) REFERENCES user (id) ON UPDATE CASCADE,
  FOREIGN KEY (epicId) REFERENCES epic (id) ON UPDATE CASCADE,
  FOREIGN KEY (parentId) REFERENCES issue (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE issue_tag (
  id      INT           NOT NULL PRIMARY KEY   AUTO_INCREMENT,
  tagname VARCHAR(128)  NOT NULL,
  issueId INT           NOT NULL,
  FOREIGN KEY (issueId) REFERENCES issue (id) ON DELETE CASCADE ON UPDATE CASCADE
);
