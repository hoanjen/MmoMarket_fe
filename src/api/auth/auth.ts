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
    otp,
  }: {
    username: string;
    email: string;
    password: string;
    otp: number;
  }): Promise<ResponseSignUp> {
    return axios
      .post('/auth/sign-up', {
        username,
        email,
        password,
        otp,
      })
      .then((_) => _.data);
  }

  public static async sendMail({ email }: { email: string }) {
    return axios.post('/mail/send-otp', { email }).then((_) => _.data);
  }
}
