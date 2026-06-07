import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: {
    email: string;
    role: 'customer' | 'employee' | null;
  } | null;
};

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken; 
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null; 
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;