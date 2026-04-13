import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
 import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcryptjs';
 

 
passport.use(
  new LocalStrategy(
     
    async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        // Success - pass the user to the next step
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

 

export default passport;