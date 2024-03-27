import { UserAuthRepository } from '../repository/auth.repository';
import {
  IUserEditParams,
  IUserLoginParams,
  UserParams,
} from '../types/user.types';
import { newToken } from '../utils/auth';
import { BadRequestError, NotFoundError } from '../utils/response/error';

class UserAuthServices {
  constructor(private readonly _userAuthRepository: UserAuthRepository) {}
  //getting profile informations
  async getUserData(userId: string) {
    const user = await this._userAuthRepository.getUserData(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return user;
  }
  //edit user informations
  async editUserInformations(params: IUserEditParams) {
    const {
      userId,
      password,
      userName,
      email,
      userBio,
      phoneNumber,
      profileStatus,
      profilePicture,
    } = params;
    const user = await this._userAuthRepository.editUserInformations({
      userId,
      password,
      userName,
      email,
      userBio,
      phoneNumber,
      profileStatus,
      profilePicture,
    });
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return user;
  }

  async registerUser(params: UserParams) {
    const { password, userName, email, userBio, phoneNumber, profileStatus } =
      params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );
    if (alreadyUser) {
      throw new BadRequestError('User already exists!');
    }
    const user = await this._userAuthRepository.registerUser({
      password,
      userName,
      email,
      userBio,
      phoneNumber,
      profileStatus,
    });
    if (!user) {
      throw new BadRequestError('Not able to create the user!');
    }
    const token = newToken({ user });

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
      throw new NotFoundError('User does not exists with this email id');
    }
    const match = alreadyUser.checkPassword(password);
    if (!match) {
      throw new BadRequestError('Password does not match');
    }
    const token = newToken({ email });

    return { token, user: alreadyUser };
  }
}

export const UserAuthServices_ = new UserAuthServices(new UserAuthRepository());
