'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { userTasksFetch } from '@/api';
import { TaskResponse } from '@/types';
import Masonry from 'react-masonry-css';
import { toast } from 'react-toastify';
import Task from '@/components/Task';
import Sort from '@/components/Sort';
import Loading from '@/components/Loading';
import Container from '@/components/Container';
import CreateTaskModalWindow from '@/components/CreateTaskModalWindow';

const breakpointColumnsObj = {
  default: 5,
  1680: 3,
  1024: 2,
  640: 1,
};

export default function Home() {
  const searchParams = useSearchParams();
  const sortParams = searchParams.get('sort');

  const [taskResponse, setTaskResponse] = useState<TaskResponse[]>();

  const getUserTasks = useCallback(async () => {
    setTaskResponse(undefined);

    try {
      const tasks = await userTasksFetch(sortParams);
      tasks && setTaskResponse(tasks);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    }
  }, [sortParams]);

  useEffect(() => {
    getUserTasks();
  }, [getUserTasks]);

  return (
    <>
      <Container className="flex justify-between items-center mt-2">
        <CreateTaskModalWindow
          getUserTasks={getUserTasks}
          isDisabled={taskResponse ? false : true}
        />
        <Sort isDisabled={taskResponse ? false : true} />
      </Container>
      {(taskResponse && (
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid">
          {taskResponse.map((el) => {
            return (
              <Task
                key={el.id}
                task={el.task}
                description={el.description}
                color={el.color}
                is_completed={el.is_completed}
                date={el.date}
                id={el.id}
                getUserTasks={getUserTasks}
              />
            );
          })}
        </Masonry>
      )) || <Loading />}
    </>
  );
}
