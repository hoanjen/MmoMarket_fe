import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user.interface';

type IStatus = 'idle' | 'loading' | 'complete';

export interface IInitialState {
  status: IStatus;
  data: IUser | null;
  error: SerializedError | null;
}

const initialState: IInitialState = {
  status: 'idle',
  data: null,
  error: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUserInfoSuccessfully: (state: IInitialState, { payload }: PayloadAction<IUser>) => {
      const status: IStatus = 'complete';

      return {
        status: status,
        data: payload,
        error: null,
      };
    },
    getUserInfoFailed: (state: IInitialState, action: any) => {
      const status: IStatus = 'complete';
      return {
        status: status,
        data: null,
        error: action.e,
      };
    },
  },
});

export const { getUserInfoFailed, getUserInfoSuccessfully } = userSlice.actions;
export default userSlice.reducer;
