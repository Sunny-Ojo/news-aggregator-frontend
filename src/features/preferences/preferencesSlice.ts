import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axiosInstance.ts';
import { PreferenceUpdate } from '../../utils/types.ts';

interface PreferencesState {
  sources: string[];
  categories: string[];
  authors: string[];
}

const initialState: PreferencesState = {
  sources: [],
  categories: [],
  authors: [],
};

// handle updating of preferences
export const updatePreferences = createAsyncThunk(
  'preferences/update',
  async (preferenceData: PreferenceUpdate) => {
    try {
      const response = await axiosInstance.put(
        '/user/preferences',
        {
          sources: preferenceData.sources,
          categories: preferenceData.categories,
          authors: preferenceData.authors,
        },
        { headers: { Authorization: `Bearer ${preferenceData.token}` } }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Error updating preferences'
      );
    }
  }
);

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    resetPreferences: (state) => {
      state.sources = [];
      state.categories = [];
      state.authors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePreferences.fulfilled, (state, action) => {
      console.log(action.payload);
      state.authors = action.payload.data.authors;
      state.categories = action.payload.data.categories;
      state.sources = action.payload.data.sources;
    });
  },
});

export const { resetPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
