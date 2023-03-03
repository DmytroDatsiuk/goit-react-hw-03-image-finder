import axios from 'axios';

export const GetPictures = async (nextName, page) => {
  const params = {
    key: '32602095-27dbade4d0732e174c3b141f5',
    q: nextName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };

  const response = await axios.get(
    'https://pixabay.com/api/',
    { params }
  );
  return response.data;
};
