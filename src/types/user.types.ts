export interface UserParams {
  password: string;
  userName: string;
  email: string;
  userBio: string;
  phoneNumber: number;
  profileStatus: string;
}

export interface IUserLoginParams {
  password: string;
  email: string;
}

export interface IUserEditParams {
  password: string;
  userName: string;
  email: string;
  userBio: string;
  phoneNumber: number;
  profileStatus: string;
  userId: string;
  profilePicture?: string;
}
