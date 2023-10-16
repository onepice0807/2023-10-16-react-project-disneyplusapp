import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'f36b2ff2255450dd445a75c6c53c578c',
    language: 'ko=KR',
  },
});

export default instance;
