import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { createTaskFetch } from '@/api';
import validateInput from '@/utils/validateInput';
import { toast } from 'react-toastify';
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

const BODY = {
  task: '',
  description: '',
  date: '',
  is_completed: false,
  color: 0,
};

const CreateTaskModalWindow: React.FC<{
  getUserTasks: () => Promise<void>;
  isDisabled: boolean;
}> = ({ getUserTasks, isDisabled }) => {
  const params = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formState, setFormState] = useState(BODY);
  const [errorState, setErrorState] = useState(false);
  const [buttonLock, setButtonLock] = useState(false);

  const handleButton = async () => {
    setButtonLock(!buttonLock);
    setErrorState(validateInput(formState.task));
    if (formState.task.trim() !== '') {
      await createTask();
    }
    setFormState(BODY);
    onClose();
    getUserTasks();
    setButtonLock(buttonLock);
  };

  const createTask = async () => {
    try {
      await createTaskFetch(formState, params);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    setFormState(BODY);
    setErrorState(false);
  }, [isOpen]);

  return (
    <>
      <Button
        isDisabled={isDisabled}
        onClick={() => onOpen()}
        disabled={buttonLock}
        type="submit"
        className="w-40 mr-2 sm:mr-0 h-10 sm:w-44 text-lg sm:text-base rounded-lg  bg-custom-pink text-[#282828] font-medium mb-3 sm:mb-2"
      >
        New Task
      </Button>

      <Modal backdrop="blur" placement="center" size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg font-bold text-content4 text-center">
                Create Task
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Task name"
                  size="md"
                  radius="sm"
                  isInvalid={errorState}
                  errorMessage="Please enter task."
                  className="h-15 rounded-lg"
                  value={formState.task}
                  onChange={(e) => setFormState({ ...formState, task: e.target.value })}
                />
                <Input
                  label="Description"
                  size="md"
                  radius="sm"
                  errorMessage="empty"
                  className="h-15 rounded-lg"
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                />
                <DatePicker
                  label="Date"
                  radius="sm"
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      date: `${
                        e
                          ? `${e.year}-${e.month < 10 ? '0' + e.month : e.month}-${
                              e.day < 10 ? '0' + e.day : e.day
                            }`
                          : ''
                      }`,
                    });
                  }}
                />
                <div className="flex items-center justify-between">
                  <p className="my-2 cursor-default">Select color</p>
                  <div className="flex">
                    <div
                      onClick={() => setFormState({ ...formState, color: 0 })}
                      className="w-6 h-6 rounded-full bg-custom-pink mr-2 flex justify-center items-center text-[#282828] cursor-pointer hover:bg-[#e2abf7] ease-linear duration-150 border-black/10 border-1"
                    >
                      {!formState.color && 'S'}
                    </div>
                    <div
                      onClick={() => setFormState({ ...formState, color: 1 })}
                      className="w-6 h-6 rounded-full bg-custom-green mr-2 flex justify-center items-center text-[#282828] cursor-pointer hover:bg-[#ced9d8] ease-linear duration-150 border-gray-600/10 border-1"
                    >
                      {formState.color === 1 && 'S'}
                    </div>
                    <div
                      onClick={() => setFormState({ ...formState, color: 2 })}
                      className="w-6 h-6 rounded-full bg-custom-white flex justify-center items-center text-[#282828] cursor-pointer hover:bg-[#ffffff] ease-linear duration-150 border-black/10 border-1"
                    >
                      {formState.color === 2 && 'S'}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={handleButton}
                  isLoading={buttonLock}
                  type="submit"
                  className="h-11 w-full rounded-lg  bg-custom-pink text-[#282828] font-bold mr-2"
                >
                  Create
                </Button>
                <Button
                  disabled={buttonLock}
                  onClick={onClose}
                  className="h-11 w-full rounded-lg  bg-custom-green text-[#282828] font-bold"
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTaskModalWindow;
