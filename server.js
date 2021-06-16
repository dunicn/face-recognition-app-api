const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '345',
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'cakes',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '956',
      hash: '',
      email: 'john@gmail.com',
    },
  ],
};

app.get('/', (req, res) => {
  res.json(database.users);
});

app.post('/signin', (req, res) => {
  bcrypt.compare(
    'icecream',
    '$2a$10$n8j8OAcg6Gs7.CbmTr4TxuTwcFx5qpVLs3YXQtnVj9Upv0CLltGEO',
    function (err, result) {
      console.log('first guess', result);
    }
  );
  bcrypt.compare(
    'apples',
    '$2a$10$n8j8OAcg6Gs7.CbmTr4TxuTwcFx5qpVLs3YXQtnVj9Upv0CLltGEO',
    function (err, result) {
      console.log('second guess', result);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('Error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: '845',
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json('No such user');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json('No such user');
  }
});

app.listen(3001, () => {
  console.log('app is running on port 3001');
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/iamge --> PUT --> user

*/
