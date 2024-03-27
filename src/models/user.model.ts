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
  userName: {
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
    required: true,
  },
  profilePicture: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  userBio: {
    type: String,
  },
});

export interface IUser extends Document {
  password: string;
  userName: string;
  email: string;
  profileStatus: profileStatus;
  userBio: string;
  phoneNumber: string;
  checkPassword(password: string): boolean;
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

const UserModel = mongoose.model<IUser>('user', userSchema);

export default UserModel;
