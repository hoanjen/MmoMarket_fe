export type ResponseSignIn = {
  status: string;
  statusCode: number;
  data: {
    access_token: string;
    refresh_token: string;
    user_id: string;
  };
  message: string[];
};

export type ResponseSignUp = {
  status: string;
  statusCode: number;
  data: {
    user: {
      email: string;
      first_name: string;
      last_name: string;
      middle_name: string;
      username: string;
      phone_number: string;
      google_id: string;
      dob: string;
      gender: string;
      avatar: string;
      cover_image: string;
      full_name: string;
      balance: string;
      id: string;
      created_at: string;
      updated_at: string;
    };
  };
  message: string[];
};
