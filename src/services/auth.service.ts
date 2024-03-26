import { UserAuthRepository } from '../repository/auth.repository';
import { IUserLoginParams, UserParams } from '../types/user.types';
import { newToken } from '../utils/auth';

class UserAuthServices {
  constructor(private readonly _userAuthRepository: UserAuthRepository) {}

  async getUserData(userId: string) {
    const user = await this._userAuthRepository.getUserData(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  async registerUser(params: UserParams) {
    const { password, userName, email, userBio, phoneNumber } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );
    if (alreadyUser) {
      throw new Error('User already exists!');
    }
    const user = await this._userAuthRepository.registerUser({
      password,
      userName,
      email,
      userBio,
      phoneNumber,
    });
    if (!user) {
      throw new Error('Not able to create the user');
    }
    const token = newToken({ userName, password });

    return {
      token,
      user,
    };
  }

  async userLogin(params: IUserLoginParams) {
    const { password, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );

    if (!alreadyUser) {
      throw new Error('User does not exists with this email id');
    }
    const match = alreadyUser.checkPassword(password);
    if (!match) {
      throw new Error('Password does not match');
    }
    const token = newToken({ email });

    return { token, user: alreadyUser };
  }
}

export const UserAuthServices_ = new UserAuthServices();
