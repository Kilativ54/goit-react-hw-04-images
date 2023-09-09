import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (currentSearch, pageNr, totalPages) => {
  const response = await axios.get(`/?q=${currentSearch}&page=${pageNr}&key=38025875-c7d32510ab040b2a6f36bb46b&image_type=photo&orientation=horizontal&per_page=12`
  );
  totalPages = response.data.totalHits / 12;
  return response.data;
};