import express from 'express';
import users from '../data/users';

const fs = require('fs');
const router = express.Router();


router.get('/user/:id', (req, res, next) => {
  res.json(users.find(user => user.id === +req.params.id))
});

router.get('/users', (req, res, next) => {
  res.json(users);
});

router.get('/users/count', (req, res, next) => {
  res.json({ count: users.length });
});

router.patch('/user/:id', (req, res, next) => {
  const userId = req.params.id;
  const city = req.body.city;
  const result = users.find(user => user.id == userId);
  if (!result) {
    res.status(400).json({ error: `Couldn't find user with id ${userId}` })
  }
  result.city = city;
  res.json(result);
});

router.post('/user/country', (req, res, next) => {
  const userId = req.body.userId;
  const country = req.body.country;

  users.forEach(user => {
    if (user.id == userId) {
      user.city = country
    }
  });

  fs.writeFile(__dirname + '/../data/users.json', JSON.stringify(users), function (err) {
    if (err) return console.log(err);
    return res.sendStatus(200)
  });
});

export default router;
