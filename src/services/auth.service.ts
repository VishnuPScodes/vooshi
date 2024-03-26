import { UserAuthRepository } from '../repository/auth.repository';

class UserAuthServices {
  constructor() {
    this._userAuthRepository = new UserAuthRepository();
  }

  async getUserData(userId) {
    const user = await this._userAuthRepository.getUserData(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  async registerUser(params) {
    const { password, name, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );
    if (alreadyUser) {
      throw new Error('User already exists!');
    }
    const user = await this._userAuthRepository.registerUser({
      password,
      name,
      email,
    });
    if (!user) {
      throw new Error('Not able to create the user');
    }
    const token = newToken();

    return {
      token,
      user,
    };
  }

  async userLogin(params) {
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
    const token = newToken();

    return { token, user: alreadyUser };
  }
}

export const UserAuthServices_ = new UserAuthServices();
