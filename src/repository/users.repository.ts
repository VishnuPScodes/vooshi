import UserModel from '../models/user.model';
import { IUserEditParams, UserParams } from '../types/user.types';

export class UsersRepository {
  private _model = UserModel;

  async getUsers(match: any) {
    const user = this._model.aggregate([
      {
        $match: match,
      },
    ]);

    return user;
  }
}
