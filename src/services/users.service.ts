import { UsersRepository } from '../repository/users.repository';

import { NotFoundError } from '../utils/response/error';

class UsersServices {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async getUsers({ isPrivate, page, limit }: any) {
    page = Number(page);
    limit = Number(limit);
    if (!Number.isInteger(page) || page < 1) {
      page = 1;
    }
    if (!Number.isInteger(limit) || limit < 1) {
      limit = 10;
    }
    let match: any = {};
    if (isPrivate == 'false' || !isPrivate) {
      match.profileStatus = 'public';
    }
    const user = await this._usersRepository.getUsers(match, page, limit);

    if (!user) {
      throw new NotFoundError('Users not found!');
    }

    return user;
  }

  async getPublicUsers({ page, limit }: any) {
    page = Number(page);
    limit = Number(limit);
    if (!Number.isInteger(page) || page < 1) {
      page = 1;
    }
    if (!Number.isInteger(limit) || limit < 1) {
      limit = 10;
    }
    const user = await this._usersRepository.getPublicUsers(page, limit);

    if (!user) {
      throw new NotFoundError('Users not found!');
    }

    return user;
  }
}

export const UsersServices_ = new UsersServices(new UsersRepository());
