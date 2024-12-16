import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axiosInstance.ts';
import { RootState } from '../../store/index.ts';
import { PreferenceUpdate } from '../../utils/types.ts';

// Define types
interface Preferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  preferences: Preferences;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Utility function to handle errors
const handleError = (error: any, defaultMessage: string) => {
  return error?.response?.data || { message: defaultMessage };
};

// handle register
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
      return rejectWithValue(handleError(error, 'Registration failed.'));
    }
  }
);

//handle login
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
      return rejectWithValue(handleError(error, 'Login failed.'));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error('Token not found');

      const { data } = await axiosInstance.post(
        '/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(handleError(error, 'Logout failed.'));
    }
  }
);

export const updatePreferences = createAsyncThunk(
  'preferences/update',
  async (preferenceData: PreferenceUpdate, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        '/user/preferences',
        {
          sources: preferenceData.sources,
          categories: preferenceData.categories,
          authors: preferenceData.authors,
        },
        { headers: { Authorization: `Bearer ${preferenceData.token}` } }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(
        handleError(error, 'Updating preferences failed.')
      );
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, token } = action.payload.data;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload.data;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        if (state.user) {
          state.user.preferences = action.payload.data;
        }
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
