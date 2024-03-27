// Import IUser interface and User model
import { IUser, profileStatus } from '../models/user.model';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4001/auth/google/callback',
      passReqToCallback: true,
    },
    async function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      try {
        // Check if user with the given email exists in the database
        let user = await User.findOne({ email: profile.email }).exec();

        if (!user) {
          // If user does not exist, create a new user
          const hashedPassword = bcrypt.hashSync(uuidv4(), 8); // Generate a random password
          user = await User.create<IUser>({
            userName: profile.displayName || '',
            email: profile.email,
            password: hashedPassword,
            profileStatus: profileStatus.PUBLIC,
            phoneNumber: '00000000',
          } as IUser);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
