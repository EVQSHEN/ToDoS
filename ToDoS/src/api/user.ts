import axios, { AxiosError } from 'axios';

export const userFetch = async () => {
  const { data } = await axios.get(`users/profile`);

  return data;
};
