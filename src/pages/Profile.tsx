import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  fetchCategories,
  fetchSources,
  fetchAuthors,
} from '../services/filtersService.ts';
import { AppDispatch, RootState } from '../store/index.ts';
import { updatePreferences } from '../features/preferences/preferencesSlice.ts';

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    categories: storedCategories,
    sources: storedSources,
    authors: storedAuthors,
  } = useSelector((state: RootState) => state.preferences);

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedSources, setSelectedSources] = useState<any[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [apiCategories, setApiCategories] = useState<string[]>([]);
  const [apiSources, setApiSources] = useState<string[]>([]);
  const [apiAuthors, setApiAuthors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, sourcesData, authorsData] = await Promise.all([
          fetchCategories(),
          fetchSources(),
          fetchAuthors(),
        ]);

        setApiCategories(categoriesData);
        setApiSources(sourcesData);
        setApiAuthors(authorsData);

        setSelectedCategories(
          storedCategories.map((category) => ({
            value: category,
            label: category,
          }))
        );
        setSelectedSources(
          storedSources.map((source) => ({ value: source, label: source }))
        );
        setSelectedAuthors(
          storedAuthors.map((author) => ({ value: author, label: author }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, storedCategories, storedSources, storedAuthors]);

  const handleSubmit = async () => {
    const dataUpdate = {
      categories: selectedCategories.map((item) => item.value),
      sources: selectedSources.map((item) => item.value),
      authors: selectedAuthors.map((item) => item.value),
      token,
    };

    try {
      await dispatch(updatePreferences(dataUpdate));
      setSuccessMessage('Preferences saved successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to save preferences. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="p-6 my-16 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Preferences</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Preferred Categories</h2>
        {apiCategories.length > 0 ? (
          <Select
            isMulti
            options={apiCategories.map((category) => ({
              label: category,
              value: category,
            }))}
            value={selectedCategories}
            onChange={(selected: any) => setSelectedCategories(selected || [])}
            placeholder="Select categories..."
            className="mb-4"
          />
        ) : (
          <p>Loading categories...</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Preferred Sources</h2>
        {apiSources.length > 0 ? (
          <Select
            isMulti
            options={apiSources.map((source) => ({
              label: source,
              value: source,
            }))}
            value={selectedSources}
            onChange={(selected: any) => setSelectedSources(selected || [])}
            placeholder="Select sources..."
            className="mb-4"
          />
        ) : (
          <p>Loading sources...</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Preferred Authors</h2>
        {apiAuthors.length > 0 ? (
          <Select
            isMulti
            options={apiAuthors.map((author) => ({
              label: author,
              value: author,
            }))}
            value={selectedAuthors}
            onChange={(selected: any) => setSelectedAuthors(selected || [])}
            placeholder="Select authors..."
            className="mb-4"
          />
        ) : (
          <p>Loading authors...</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Preferences
      </button>

      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default Profile;
