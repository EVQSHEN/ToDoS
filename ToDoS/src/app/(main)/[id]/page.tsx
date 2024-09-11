'use client';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { userTasksByIdFetch } from '@/api';
import { TaskResponse } from '@/types';
import { toast } from 'react-toastify';
import Masonry from 'react-masonry-css';
import Sort from '@/components/Sort';
import Task from '@/components/Task';
import Loading from '@/components/Loading';
import Container from '@/components/Container';
import CreateTaskModalWindow from '@/components/CreateTaskModalWindow';

const breakpointColumnsObj = {
  default: 5,
  1680: 3,
  1024: 2,
  640: 1,
};

const Id = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [taskResponse, setTaskResponse] = useState<TaskResponse[]>();
  const sortParams = searchParams.get('sort');

  const getUserTasks = useCallback(async () => {
    setTaskResponse(undefined);
    try {
      const tasks = await userTasksByIdFetch(id, sortParams);
      setTaskResponse(tasks);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'An error occurred');
        console.log(err);
      }
    }
  }, [id, sortParams]);

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
};

export default Id;
