import UserModel from '../models/user.model';

export class UsersRepository {
  private _model = UserModel;

  async getUsers(match: any, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const users = await this._model
      .aggregate([
        {
          $match: match,
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ])
      .exec();

    return users;
  }

  async getPublicUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const users = await this._model.aggregate([
      {
        $match: {
          profileStatus: 'public',
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    return users;
  }
}
