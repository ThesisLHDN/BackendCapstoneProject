DROP SCHEMA IF EXISTS capstone;
CREATE SCHEMA capstone;

USE capstone;

CREATE TABLE user (
  id        CHAR(28)      NOT NULL    PRIMARY KEY,
  email     VARCHAR(128)  NOT NULL,
  username  VARCHAR(128),
  phone     VARCHAR(16)
);

CREATE TABLE notification (
  id        INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  content   TEXT          NOT NULL,
  link      VARCHAR(128),
  userId    CHAR(28)      NOT NULL,
  FOREIGN KEY (userId) REFERENCES user (id) ON UPDATE CASCADE
);

CREATE TABLE workspace (
  id          INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  wsname      VARCHAR(128)  NOT NULL,
  descript    MEDIUMTEXT,
  createTime  DATETIME      NOT NULL,
  adminId     CHAR(28)      NOT NULL,
  FOREIGN KEY (adminId) REFERENCES user (id) ON UPDATE CASCADE
);

CREATE TABLE project (
  id          INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  pname       VARCHAR(128)  NOT NULL,
  pkey        VARCHAR(16),
  createTime  DATETIME      NOT NULL,
  ownerId     CHAR(28)      NOT NULL,
  workspaceId INT           NOT NULL,
  FOREIGN KEY (ownerId) REFERENCES user (id) ON UPDATE CASCADE,
  FOREIGN KEY (workspaceId) REFERENCES workspace (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE works_on (
  userId      CHAR(28)    NOT NULL,
  projectId   INT         NOT NULL,
  PRIMARY KEY (userId, projectId),
  FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (projectId) REFERENCES project (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE cycle (
  id        INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  cyclename VARCHAR(128)  NOT NULL,
  startDate DATETIME      NOT NULL,
  endDate   DATETIME,
  cstatus   BIT           NOT NULL,
  goal      MEDIUMTEXT,
  ownerId   CHAR(28)      NOT NULL,
  projectId INT           NOT NULL,
  FOREIGN KEY (ownerId) REFERENCES user (id) ON UPDATE CASCADE,
  FOREIGN KEY (projectId) REFERENCES project (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE epic (
  id        INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  epicname  VARCHAR(128)  NOT NULL,
  startDate DATETIME      NOT NULL,
  endDate   DATETIME
);

CREATE TABLE status (
  id    INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  sname VARCHAR(128)  NOT NULL
);

CREATE TABLE issue (
  id            INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  issuename     VARCHAR(128)  NOT NULL,
  createTime    DATETIME      NOT NULL,
  reporterId    CHAR(28)      NOT NULL,
  projectId     INT           NOT NULL,
  statusId      INT           NOT NULL,
  cycleId       INT           NOT NULL,
  descript      LONGTEXT,
  priority      INT,
  dueDate       DATETIME,
  estimatePoint INT,
  assigneeId    CHAR(28),
  epicId        INT,
  parentId      INT,
  FOREIGN KEY (reporterId) REFERENCES user (id) ON UPDATE CASCADE,
  FOREIGN KEY (projectId) REFERENCES project (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (statusId) REFERENCES status (id) ON UPDATE CASCADE,
  FOREIGN KEY (cycleId) REFERENCES cycle (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (assigneeId) REFERENCES user (id) ON UPDATE CASCADE,
  FOREIGN KEY (epicId) REFERENCES epic (id) ON UPDATE CASCADE,
  FOREIGN KEY (parentId) REFERENCES issue (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE issue_tag (
  id      INT           NOT NULL,
  tagname VARCHAR(128)  NOT NULL,
  PRIMARY KEY (id, tagname)
);

CREATE TABLE comment (
  id          CHAR(28)      NOT NULL,
  issueId     INT           NOT NULL,
  createTime  DATETIME      NOT NULL,
  userId      CHAR(28),
  FOREIGN KEY (issueId) REFERENCES issue (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES user (id) ON UPDATE CASCADE
);

CREATE TABLE chat_channel (
  id        CHAR(28)      NOT NULL    PRIMARY KEY,
  chatname  VARCHAR(128)  NOT NULL,
  projectId INT           NOT NULL,
  FOREIGN KEY (projectId) REFERENCES project (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE folder (
  id            INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  foldername    VARCHAR(128)  NOT NULL,
  projectId     INT           NOT NULL,
  FOREIGN KEY (projectId) REFERENCES project (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE file (
  id          INT           NOT NULL    PRIMARY KEY   AUTO_INCREMENT,
  fname       VARCHAR(128)  NOT NULL,
  uploadTime  DATETIME      NOT NULL,
  filetype    VARCHAR(64)   NOT NULL,
  userId      CHAR(28)      NOT NULL,
  issueId     INT,
  folderId    INT,
  FOREIGN KEY (issueId) REFERENCES issue (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (folderId) REFERENCES folder (id) ON DELETE CASCADE ON UPDATE CASCADE
);



