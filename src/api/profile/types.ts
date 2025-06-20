export type ResponseProfile = {
  status: string;
  statusCode: number;
  data: {
    user: {
      id: string;
      email: string;
      full_name: string;
      first_name: string;
      last_name: string;
      middle_name: string;
      username: string;
      phone_number: string;
      google_id: string;
      dob: string;
      gender: string;
      avatar: string;
      role: string;
      cover_image: string;
      created_at: string;
      updated_at: string;
      balance: {
        account_balance: number;
      };
    };
  };
  message: [];
};

export type ResponseProfileById = {
  status: string;
  statusCode: number;
  data: {
    id: string;
    email: string;
    full_name: string;
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
    created_at: string;
    updated_at: string;
  };
  message: [];
};

export type ResponseFileImage = {
  url: string;
  name: string;
  size: number;
}[];

export type RequestConnectChat = {
  receiver_id: string;
};

export type ResponseConectChat = {
  id: string;
  statusCode: number;
};

export type RequestProfile = {
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  dob: string;
  gender: string;
  avatar: string;
  cover_image: string;
  google_id: string;
  phone_number: string;
};
