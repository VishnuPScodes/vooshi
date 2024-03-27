import { UserAuthRepository } from '../repository/auth.repository';
import { UsersRepository } from '../repository/users.repository';
import {
  IUserEditParams,
  IUserLoginParams,
  UserParams,
} from '../types/user.types';
import { newToken } from '../utils/auth';
import { BadRequestError, NotFoundError } from '../utils/response/error';

class UsersServices {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async getUsers({ isPrivate }: any) {
    console.log('private is 2', isPrivate);
    let profileStatus;
    let match: any = {};
    if (isPrivate == 'false' || !isPrivate) {
      match.profileStatus = 'public';
    }
    const user = await this._usersRepository.getUsers(match);

    if (!user) {
      throw new NotFoundError('Users not found!');
    }

    return user;
  }
}

export const UsersServices_ = new UsersServices(new UsersRepository());
