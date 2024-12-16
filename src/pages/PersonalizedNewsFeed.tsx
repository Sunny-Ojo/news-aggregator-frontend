import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setArticles,
  setLoading,
  setError,
} from '../features/news/newsSlice.ts';
import {
  fetchArticles,
  fetchPersonalizedFeed,
} from '../services/newsService.ts';
import SearchBar from '../components/SearchBar.tsx';
import Filters from '../components/Filters.tsx';
import ArticleCard from '../components/ArticleCard.tsx';
import { RootState } from '../store/index.ts';
import { useNavigate } from 'react-router-dom';

const PersonalizedNewsFeed: React.FC = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );
  const { token } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    const fetchNews = async () => {
      dispatch(setLoading(true));
      try {
        const response = token
          ? await fetchPersonalizedFeed(
              token,
              page,
              keyword,
              dateFilter,
              categoryFilter,
              sourceFilter
            )
          : await fetchArticles(
              page,
              keyword,
              dateFilter,
              categoryFilter,
              sourceFilter
            );

        dispatch(setArticles(response.articles));
        setLastPage(response.last_page);
      } catch (err) {
        dispatch(setError('Failed to fetch articles'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNews();
  }, [
    dispatch,
    page,
    token,
    keyword,
    dateFilter,
    categoryFilter,
    sourceFilter,
  ]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setPage(newPage);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Personalized News Feed
      </h2>

      <SearchBar keyword={keyword} onKeywordChange={setKeyword} />

      <Filters
        selectedCategory={categoryFilter}
        selectedDate={dateFilter}
        selectedSource={sourceFilter}
        onDateChange={setDateFilter}
        onCategoryChange={setCategoryFilter}
        onSourceChange={setSourceFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            author={article.author}
            description={article.description}
            imageUrl={article.image_url}
            category={article.category}
            publishedAt={article.published_at}
            url={article.url}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === lastPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalizedNewsFeed;
