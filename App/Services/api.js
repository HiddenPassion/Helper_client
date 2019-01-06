// @flow
import axios from 'axios';
import urls from './urls';

const createApi = (getToken: () => string) /* : ApiType */ => {
  const token = getToken();

  const api = axios.create({
    baseURL: urls.BASE_URL,
  });

  api.interceptors.request.use(
    async (req) => {
      if (token && req.method !== 'OPTIONS') {
        req.headers.authorization = `Bearer ${token}`;
      }
      return req;
    },
    error => Promise.reject(error),
  );

  const login = data => api.post(urls.login, data);
  const registration = data => api.post(urls.registration, data);
  const getUniversityList = () => api.get(urls.getUniversityList);
  const editUniversity = ({ id, shortName, fullName }) =>
    api.patch(urls.editUniversity(id), { shortName, fullName });
  const createUniversity = ({ shortName, fullName }) =>
    api.post(urls.createUniversity, { shortName, fullName });

  return {
    login,
    registration,
    getUniversityList,
    editUniversity,
    createUniversity,
  };
};

export default createApi;
