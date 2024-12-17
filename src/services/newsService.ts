import { Article } from '../features/news/newsSlice';
import { axiosInstance } from '../utils/axiosInstance.ts';

// Fetch all general articles
export const fetchArticles = async (
  page: number = 1,
  keyword: string,
  date: string,
  category: string,
  source: string
) => {
  const { data } = await axiosInstance.get('/articles', {
    params: {
      page,
      keyword,
      date,
      category,
      source,
    },
  });
  return { articles: data.data, last_page: data.meta.last_page };
};

// Fetch personalized articles for the user
export const fetchPersonalizedFeed = async (
  token: string,
  page: number = 1,
  keyword: string,
  date: string,
  category: string,
  source: string
): Promise<{ articles: Article[]; last_page: number }> => {
  const { data } = await axiosInstance.get(`/user/personalized-feed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { page, keyword, date, category, source },
  });

  return { articles: data.data, last_page: data.meta.last_page };
};
