import jwt from 'jsonwebtoken';
export const newToken = ({ user }: any) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY || 'secretkey', {
    expiresIn: '1h',
  });
};
