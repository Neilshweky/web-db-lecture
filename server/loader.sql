CREATE TABLE Todos (
  title varchar(255),
  completed boolean,
  PRIMARY KEY (title)
);

INSERT INTO Todos (title, completed)
VALUES ('Grocery Shopping', TRUE);

INSERT INTO Todos (title, completed)
VALUES ('Make Guac', FALSE);