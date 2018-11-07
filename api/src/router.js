import express from 'express';
import users from '../data/users';

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
  const userID = req.params.id;
  const city = req.body.city;
  const result = users.find(user => user.id == userID);
  if (!result) {
    res.status(400).json({ error: `Couldn't find user with id ${userID}` })
  }
  result.city = city;
  res.json(result);
});

export default router;
