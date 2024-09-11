'use client';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { listsFetch } from '@/api';
import { List } from '@/types';

export const listsContext = createContext<{
  lists: List[] | undefined;
  setLists: Dispatch<SetStateAction<List[] | undefined>>;
  getLists: () => Promise<void>;
}>({
  lists: undefined,
  setLists: () => {},
  getLists: async () => {},
});

export const useLists = () => {
  return useContext(listsContext);
};

export function ListProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<List[] | undefined>();

  const getLists = async () => {
    try {
      const response = await listsFetch();
      setLists(response);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <listsContext.Provider value={{ lists, setLists, getLists }}>{children}</listsContext.Provider>
  );
}
