const express = require('express');
const routes = require('./routes/routes.js');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'some secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(morgan('tiny'));

/** ENDPOINTS **/
app.post('/addtodo', routes.addTodo);
app.get('/listtodos', routes.listTodos);
app.put('/updatetodo', routes.updateTodo);

<<<<<<< HEAD

app.get('/listtodos', routes.listTodos)
app.post('/addtodo', routes.addTodo)
app.put('/updatetodo', routes.updateTodo)
app.delete('/deletetodo', routes.deleteTodo)


console.log('Authors: Neil Shweky (nshweky)');
=======
>>>>>>> 01f6eb7c045d7bfc5c4a0eb93c7e4f787d7caf61
const port = process.env.PORT || '8080';
app.listen(port, () => {
  console.log(
    'Server running on port ' + port + '. Now open http://localhost:' + port + '/ in your browser!'
  );
});
