import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string; // Username acts as ID
  password: string;
  name: string;
}

interface UsersState {
  currentUser: string | null;
  users: User[];
}

const initialState: UsersState = {
  currentUser: null,
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const exists = state.users.find(
        (u) => u.username === action.payload.username
      );
      if (!exists) state.users.push(action.payload);
    },
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      const exists = state.users.find(
        (u) =>
          u.username === action.payload.username &&
          u.password === action.payload.password
      );
      if (exists) state.currentUser = action.payload.username;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { register, login, logout } = usersSlice.actions;
export default usersSlice.reducer;
