import { axiosInstance } from '../utils/axiosInstance.ts';

export const fetchCategories = async () => {
  try {
    const { data } = await axiosInstance.get('/categories');
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const fetchSources = async () => {
  try {
    const { data } = await axiosInstance.get('/sources');
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch sources');
  }
};

export const fetchAuthors = async () => {
  try {
    const { data } = await axiosInstance.get('/authors');
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch authors');
  }
};
