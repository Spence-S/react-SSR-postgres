import express from 'express';
import passport from '../../config/passport';
import Users from '../models/Users';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('got in the API ');
  res.send('sup ninja');
});

router.get('/private', passport.authenticate('local'), (req, res) => {
  res.send('private message');
});

router.post('/', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

router.post('/signup', async (req, res) => {
  const user = await Users.create({
    email: req.body.email,
    password: req.body.password
  });
  res.send(user);
});

export default router;
