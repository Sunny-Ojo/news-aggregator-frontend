import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axiosInstance.ts';

interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post('/register', userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data || {
          message: 'Something went wrong. Please try again.',
        }
      );
    }
  }
);

// handle login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post('/login', userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
