import axios from 'axios';

const API_KEY = '36139966-d8e0729651e76793d90192565';

const instancePixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const fetchPixabay = async (query, page) => {
  const { data } = await instancePixabayApi.get(`?q=${query}&page=${page}`);
  return data;
};
