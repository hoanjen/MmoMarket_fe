import axios from "../index";

export type ResponseSignIn = {
  status: string;
  statusCode: number;
  data: {
    access_token: string;
    refresh_token: string;
  };
  message: string[];
};

export class AuthApi {
  public static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ResponseSignIn> {
    return axios
      .post("/auth/signin", {
        email,
        password,
      })
      .then((_) => _.data);
  }
}
