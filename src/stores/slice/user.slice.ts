import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  id: string;
  email: string;
  username: string;
  avatar: string;
  phone_number: string;
  role?: string;
  balance: number;
}

const initialState: userState = {
  id: '',
  email: '',
  username: '',
  avatar: '',
  phone_number: '',
  balance: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: userState, action: PayloadAction<userState>) => {
      return { ...state, ...action.payload };
    },

    resetUser: (state: userState) => {
      return initialState;
    },

    updateUser: (state: userState, action: PayloadAction<Partial<userState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, resetUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
