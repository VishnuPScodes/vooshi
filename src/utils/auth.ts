import jwt from 'jsonwebtoken';
export const newToken = ({ userName, password }: any) => {
  return jwt.sign(
    { userName, password },
    process.env.JWT_SECRET_KEY || 'secretkey'
  );
};
