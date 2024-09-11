'use client';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { AxiosError } from 'axios';
import debounce from 'lodash.debounce';
import { deleteTaskFetch, editTaskFetch } from '@/api';
import { TaskEdit, TaskResponse } from '@/types';
import changeHeightTextarea from '@/utils/changeHeightTextarea';
import { toast } from 'react-toastify';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TASK_EXECUTED = ['fill-[#8800B9]', 'fill-[#009D48]', 'fill-[#FF4500]'];

const TASK_COLORS = ['bg-custom-pink', 'bg-custom-green', 'bg-custom-white'];

const TASK_DATA = {
  task: '',
  description: '',
  date: '',
  list: '',
  is_completed: false,
};

const TASK_SWITCHING_MODE = {
  task: false,
  description: false,
  date: false,
};

export default function Task(props: TaskResponse) {
  const [togle, setTogle] = useState(TASK_SWITCHING_MODE);
  const [propsState, setPropsState] = useState(TASK_DATA);
  const [readMore, setReadMore] = useState(false);

  const taskRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const editTask = async (propsState: TaskEdit) => {
    try {
      await editTaskFetch(props.id, propsState);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'An error occurred');
        console.log(err);
      }
    }
  };

  const updateEditTask = useCallback(
    debounce((props) => {
      editTask(props);
    }, 1000),
    [],
  );

  const deleteTask = async () => {
    try {
      await deleteTaskFetch(props.id);
      props.getUserTasks();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'An error occurred');
        console.log(err);
      }
    }
  };

  const isCompletedFunc = () => {
    setPropsState({ ...propsState, is_completed: !propsState.is_completed });
    editTask({ ...propsState, is_completed: !propsState.is_completed });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      togle.task ? setTogle({ ...togle, task: false }) : setTogle({ ...togle, description: false });

      event.preventDefault();
      event.stopPropagation();

      editTask(propsState);
    }
  };

  useEffect(() => {
    setPropsState({
      task: props.task,
      description: props.description,
      date: props.date,
      is_completed: props.is_completed,
      list: '',
    });
  }, [props.task, props.description, props.date, props.is_completed]);

  useEffect(() => {
    changeHeightTextarea();
  }, [togle]);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (togle.task && taskRef.current && !taskRef.current.contains(event.target)) {
        setTogle({ ...togle, task: false });
      } else if (
        togle.description &&
        descriptionRef.current &&
        !descriptionRef.current.contains(event.target)
      ) {
        setTogle({ ...togle, description: false });
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [togle]);

  return (
    <div
      className={`min-w-56 rounded-lg m-1.5 mb-3 p-1.5 ${
        TASK_COLORS[props.color]
      } border-1 border-black/5`}
    >
      <div className="flex flex-row text-xs font-bold justify-between items-center text-custom-gray mb-1">
        <Tooltip
          content={
            propsState.is_completed ? 'Mark the task as incomplete' : 'Mark the task as complete'
          }
          delay={600}
          offset={0}
        >
          <ControlPointOutlinedIcon
            onClick={() => isCompletedFunc()}
            className={`${
              !propsState.is_completed ? 'fill-[#444444]' : TASK_EXECUTED[props?.color]
            } cursor-pointer`}
          />
        </Tooltip>
        <input
          type="date"
          name="date"
          id=""
          value={propsState.date}
          onChange={(e) => {
            updateEditTask({ ...propsState, date: e.target.value });
            setPropsState({ ...propsState, date: e.target.value });
          }}
          className={`${TASK_COLORS[props.color]} ml-4`}
        />
        <Tooltip content="Delete task" delay={600} offset={0}>
          <HighlightOffOutlinedIcon className="cursor-pointer" onClick={() => deleteTask()} />
        </Tooltip>
      </div>
      {!togle.task ? (
        <h3
          onDoubleClick={() => {
            setTogle({ ...togle, task: !togle.task });
          }}
          className={`text-custom-black cursor-pointer  select-none  p-2 text-base  pb-[2px] text-wrap text-justify font-bold ${
            !propsState.is_completed ? 'no-underline' : 'line-through'
          }
					${readMore ? 'text-clip' : 'truncate'}`}
        >
          {propsState.task}
        </h3>
      ) : (
        <textarea
          ref={taskRef}
          className={`text-custom-black bg-black rounded  p-2 text-base w-full text-wrap bg-opacity-10 h-auto -mb-1 text-justify font-bold`}
          onDoubleClick={() => {
            setTogle({ ...togle, task: !togle.task });
          }}
          value={propsState.task}
          onChange={(e) => {
            setPropsState({ ...propsState, task: e.target.value });
            updateEditTask({ ...propsState, task: e.target.value });
            changeHeightTextarea();
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        />
      )}

      {!togle.description ? (
        <p
          className={`text-custom-black cursor-pointer select-none text-base p-2 text-justify ${
            readMore ? 'opacity-100 max-h-dvh' : 'opacity-0 max-h-0 pb-0'
          } ${
            !propsState.description && 'bg-black bg-opacity-5 rounded-sm text-opacity-50'
          } -mb-1 ease-in-out transition-all duration-500 text-wrap`}
          onDoubleClick={() => {
            setTogle({ ...togle, description: !togle.description });
          }}
        >
          {propsState.description ? propsState.description : 'Double-tap to enter text'}
        </p>
      ) : (
        <textarea
          ref={descriptionRef}
          className={`text-custom-black bg-black bg-opacity-10  p-2 rounded ${
            readMore ? 'opacity-100 max-h-dvh' : 'opacity-0 max-h-0 pb-0'
          } -mb-1 text-base w-full text-wrap h-auto text-justify text-black`}
          onDoubleClick={() => {
            setTogle({ ...togle, description: !togle.description });
          }}
          value={propsState.description}
          onChange={(e) => {
            setPropsState({ ...propsState, description: e.target.value });
            updateEditTask({ ...propsState, description: e.target.value });
            changeHeightTextarea();
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        />
      )}
      <div className="flex justify-center">
        <KeyboardArrowDownIcon
          onClick={() => {
            setTogle({ task: false, description: false, date: false });
            setReadMore(!readMore);
          }}
          className={`fill-black ${readMore ? 'rotate-180' : 'rotate-0'} cursor-pointer`}
        />
      </div>
    </div>
  );
}
