import axios from 'axios';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { TaskEdit } from '@/types';

export const userTasksFetch = async (sort: string | null) => {
  const sortParams = sort !== null && sort !== 'default' ? `?sort=${sort}` : '';

  const { data } = await axios.get(`tasks/${sortParams}`);

  return data;
};

export const userTasksByIdFetch = async (id: string | string[], sort: string | null) => {
  const sortParams = sort !== null && sort !== 'default' ? `?sort=${sort}` : '';

  const { data } = await axios.get(`lists/${id}/${sortParams}`);

  return data;
};

export const createTaskFetch = async (formState: TaskEdit, params: Params) => {
  await axios.post(`tasks${params.id ? `/${params.id}` : ''}`, formState);
};

export const editTaskFetch = async (id: number, formState: TaskEdit) => {
  await axios.put(`tasks/${id}`, formState);
};

export const deleteTaskFetch = async (id: number) => {
  await axios.delete(`tasks/${id}`);
};
