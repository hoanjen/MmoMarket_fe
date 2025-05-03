import axios from '../index';
import { ResponseSignIn, ResponseSignUp } from './types';

export class AuthApi {
  public static async login({ email, password }: { email: string; password: string }): Promise<ResponseSignIn> {
    return axios
      .post('/auth/signin', {
        email,
        password,
      })
      .then((_) => _.data);
  }

  public static async signUp({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Promise<ResponseSignUp> {
    return axios
      .post('/auth/sign-up', {
        username,
        email,
        password,
      })
      .then((_) => _.data);
  }
}
