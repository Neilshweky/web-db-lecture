var config = require('../db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

function addTodo(req, res) {
  var query = `
    INSERT INTO todos (title, completed)
    VALUES ('${req.body.title}', ${req.body.completed});
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) res.status(400).send(err);
    else res.send(`Successfully added '${req.body.title}'`);
  });
}

function listTodos(req, res) {
  var query;
  if (!req.query.completed) {
    query = `
      SELECT *
      FROM Todos;
    `;
  } else {
    query = `
      SELECT *
      FROM Todos
      WHERE completed = ${req.query.completed}
    `;
  }

  connection.query(query, function(err, rows, fields) {
    if (err) res.status(400).send(err);
    else res.json(rows);
  });
}

function updateTodo(req, res) {
  var query = `
    UPDATE Todos
    SET completed = ${req.body.completed}
    WHERE title = '${req.body.title}';
`;
connection.query(query, function(err, rows, fields) {
  if (err) res.status(400).send(err);
  else res.send(`Successfully updated '${req.body.title}'`);
});
}

function deleteTodo(req, res) {
  var query = `
    DELETE FROM Todos
    WHERE title = '${req.body.title}';
`;
connection.query(query, function(err, rows, fields) {
  if (err) res.status(400).send(err);
  else res.send(`Successfully deleted '${req.body.title}'`);
});
}

module.exports = {
  addTodo,
  listTodos,
  updateTodo,
  deleteTodo
}