import axios from 'axios';

interface bodyInterdface {
  name: string;
  color: string;
}

export const createListFetch = async (body: bodyInterdface) => {
  await axios.post(`lists`, { ...body });
};

export const deleteListFetch = async (id: string | string[]) => {
  await axios.delete(`lists/${id}`);
};

export const editListFetch = async (body: bodyInterdface, id: string) => {
  await axios.post(`lists/${id}`, { ...body });
};

export const listsFetch = async () => {
  const { data } = await axios.get(`lists`);

  return data;
};
