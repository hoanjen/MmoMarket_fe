type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  phone_number: string;
  google_id: string;
  dob: string; // ISO Date format
  gender: string;
  avatar: string;
  cover_image: string;
  created_at: string; // ISO Date format
  updated_at: string; // ISO Date format
};

export type Message = {
  id: string | null;
  text: string;
  file_name: string;
  file: string;
  member_id: string | null;
  group_id: string | null;
  user_id: string | undefined;
  created_at: string; // ISO Date format
  updated_at: string | null; // ISO Date format
  user: User | null;
};

export type DetailGroup = {
  group_id: string;
  group_group_name: string;
  group_group_avatar: string;
  group_group_type: 'SINGLE' | 'GROUP'; // Giả định thêm "GROUP" nếu có nhiều loại
  group_created_at: string; // ISO Date format
  group_updated_at: string; // ISO Date format
  user_id: string;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_middle_name: string;
  user_username: string;
  user_phone_number: string;
  user_google_id: string;
  user_dob: string; // ISO Date format
  user_gender: 'MALE' | 'FEMALE';
  user_avatar: string;
  user_cover_image: string;
  user_created_at: string; // ISO Date format
  user_updated_at: string; // ISO Date format
};

export type ResponseSideBarChat = {
  status: string;
  statusCode: number;
  data: { groupSideBar: GroupSideBar[]; messageSideBar: MessageSideBar[] };
  message: [];
};

export type ResponseMessageChat = {
  status: string;
  statusCode: number;
  data: { messages: Message[]; detailGroup: DetailGroup[] };
  message: [];
};

export type GroupSideBar = {
  group_id: string;
  group_name: string | null;
  group_type: string;
  avatar: string;
};

export type MessageSideBar = {
  id: string | null;
  group_id: string | null;
  group_type: string;
  username: string | undefined;
  file_name: string;
  group_name: string | null;
  avatar: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  text: string;
  user_id: string | undefined;
  created_at: string;
};
