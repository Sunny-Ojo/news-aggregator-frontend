import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Article {
  published_at: string | Date;
  category: string;
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image_url: string;
  author: string;
}

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

// Async thunk for fetching public articles
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  //   const articles = await fetchArticles();
  //   return articles; // Will be passed to the fulfilled action
});

// Async thunk for fetching personalized news feed
export const fetchPersonalizedNews = createAsyncThunk(
  'news/fetchPersonalizedNews',
  async (token: string) => {
    // const articles = await fetchPersonalizedFeed(token);
    // return articles; // Will be passed to the fulfilled action
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setArticles, setLoading, setError } = newsSlice.actions;
export default newsSlice.reducer;
