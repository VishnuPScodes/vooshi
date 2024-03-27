import express from 'express';
import dotenv from 'dotenv';
import { connectWithMongoDB } from './src/configs/db';
import authRouter from './src/routes/auth.routes';
import session from 'express-session';
import passport from './src/configs/google-auth'; // Import the Passport configuration
import { newToken } from './src/utils/auth';
import usersRoutes from './src/routes/users.routes';

const app = express();
app.use(express.json());
dotenv.config();

// Passport middleware setup
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'some secret',
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth2 routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    //successRedirect: "/auth/google/success",
    failureRedirect: '/auth/google/failure',
  }),
  (req, res) => {
    // Handle successful authentication
    const token = newToken(req.user);
    res.send({ user: req.user, token });
  }
);

// MongoDB connection setup
const PORT = process.env.PORT || 4001;
const mongoUrl = process.env.MONGO_URL as string;
app.use('/auth', authRouter);
app.use('/users', usersRoutes);

app.listen(PORT, async () => {
  try {
    await connectWithMongoDB(mongoUrl);
    console.log('Server is running on port ', PORT);
  } catch (error) {
    console.error('Error starting server:', error);
  }
});
