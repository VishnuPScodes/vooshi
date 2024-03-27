import UserModel from '../models/user.model';
import { UserParams } from '../types/user.types';

export class UserAuthRepository {
  private _model = UserModel;

  async getUserData(userId: string) {
    const user = this._model.findOne({ _id: userId });

    return user;
  }

  async registerUser(params: UserParams) {
    const { password, userName, email, userBio, phoneNumber, profileStatus } =
      params;
    console.log('called repos');

    const user = await this._model.create({
      password,
      userName,
      email,
      userBio,
      phoneNumber,
      profileStatus,
    });
    console.log('called repos2', user);
    return user;
  }

  async isUserAlreadyExists(email: string) {
    const user = await this._model.findOne({ email });
    if (!user) {
      return false;
    }

    return user;
  }
}
