import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../api/models/Users';

passport.use(
  new LocalStrategy.Strategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) done(null, false);
        if (await user.isValidPw(password)) done(null, user);
        done(null, false);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('whern asuasthou IAIA!!');
  try {
    console.log('asfhaksfhs');
    const user = await User.findById(id);
    //if (!user) return done(null, false);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.send('You need to be logged in for that!');
};

export { isLoggedIn };
export default passport;
