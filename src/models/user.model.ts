import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum profileStatus {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileStatus: {
    type: String,
    enum: Object.values(profileStatus),
  },
});

export interface IUser extends Document {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  profileStatus: profileStatus;
}

//hashing to protect the passwords
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  } else {
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;

    return next();
  }
});

userSchema.methods.checkPassword = function (password: any) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model<IUser>('user', userSchema);

export default userModel;
