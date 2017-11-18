import express from 'express';
import passport, { isLoggedIn } from '../../config/passport';
import Users from '../models/Users';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('got in the API ');
  res.send('sup ninja');
});

router.get('/current_user', isLoggedIn, (req, res) => {
  res.send(req.user);
});

router.get('/private_data', isLoggedIn, (req, res) => {
  res.send('this be the private data!');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/signup', async (req, res) => {
  const user = await Users.create({
    email: req.body.email,
    password: req.body.password
  });
  req.login(user);
  res.send(user);
});

export default router;
