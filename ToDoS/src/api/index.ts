export * from './auth';
export * from './lits';
export * from './task';
export * from './user';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.request.use(
  function (config) {
    const token = Cookies.get('token');

    config.baseURL = process.env.NEXT_PUBLIC_API_URL;

    if (token) {
      config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
