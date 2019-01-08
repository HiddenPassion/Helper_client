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
  const deleteUniversity = ({ universityId }) =>
    api.delete(urls.deleteUniversity(universityId));
  const getSubjectList = ({ universityId }) =>
    api.get(urls.getSubjectList(universityId));
  const editSubject = ({ id, fullName, shortName }) =>
    api.patch(urls.editSubject(id), { fullName, shortName });
  const createSubject = ({ universityId, fullName, shortName }) =>
    api.post(urls.createSubject(universityId), { fullName, shortName });

  return {
    login,
    registration,
    getUniversityList,
    editUniversity,
    createUniversity,
    deleteUniversity,
    getSubjectList,
    editSubject,
    createSubject,
  };
};

export default createApi;
