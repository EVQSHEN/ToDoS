import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { createListFetch, editListFetch } from '@/api';
import { useLists } from '@/app/(main)/provider';
import { Color } from '@/types';
import validateInput from '@/utils/validateInput';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface Props {
  title: string;
  name?: string;
  color?: Color;
  asideIsOpen?: boolean;
  getLists?: () => Promise<void>;
  form?: any;
  type?: boolean;
  click?: () => void;
}

const BODY_FORM: {
  name: string;
  color: Color;
} = {
  name: '',
  color: 'orange',
};

const LIST_COLORS: Color[] = ['lime', 'orange', 'purple', 'red', 'yellow', 'green'];

const ListModalWindow = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formState, setFormState] = useState(BODY_FORM);
  const [buttonLock, setButtonLock] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const { getLists } = useLists();

  const handleCreateButton = async () => {
    setButtonLock(!buttonLock);

    setErrorState(validateInput(formState.name));

    await createList();

    setButtonLock(buttonLock);

    onClose();
  };

  const handleEditButton = async () => {
    if (props?.form && formState === props.form) {
      return onClose;
    }

    setButtonLock(!buttonLock);

    await editList();

    setButtonLock(buttonLock);

    onClose();
  };

  const createList = async () => {
    if (formState.name !== '') {
      try {
        await createListFetch(formState);

        await getLists();
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.log(err);
          toast.error(err.response?.data?.message || 'An error occurred');
        }
      }
    }
  };

  const editList = async () => {
    try {
      await editListFetch({ name: formState.name, color: formState.color }, props.form.id);

      await getLists();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    setFormState(BODY_FORM);
    setErrorState(false);
    props.form && setFormState({ ...props.form });
  }, [props.form, isOpen]);

  return (
    <>
      {(props.title === 'Create' && (
        <Tooltip
          content="Create list"
          placement="right"
          classNames={{
            base: [`hidden sm:block bg-content3 border-2 rounded-xl border-pink-500`],
            content: ['py-2 px-4 shadow-xl', 'text-content4'],
          }}
        >
          <div
            onClick={() => onOpen()}
            className={`${
              props.type ? 'w-full h-14' : props.asideIsOpen ? 'w-40 h-10' : 'w-10 h-10'
            }  flex justify-center ease-in-out transition-size duration-500 items-center border-2 cursor-pointer border-pink-500 rounded-md`}
          >
            <AddIcon />
          </div>
        </Tooltip>
      )) || (
        <EditOutlinedIcon
          onClick={() => onOpen()}
          className="hover:fill-custom-pink cursor-pointer mr-2"
        />
      )}

      <Modal backdrop="blur" placement="center" size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg font-bold text-content4 text-center">
                {props.title} List
              </ModalHeader>
              <ModalBody>
                <Input
                  label="List name"
                  size="md"
                  color="default"
                  radius="sm"
                  isInvalid={errorState}
                  errorMessage="Please enter list name."
                  className="h-15"
                  value={formState?.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />

                <Select label="Select color" radius="sm" defaultSelectedKeys={['orange']}>
                  {LIST_COLORS?.map((color) => (
                    <SelectItem
                      key={color}
                      value={color}
                      onClick={() => {
                        setFormState({ ...formState, color });
                      }}
                    >
                      {color.split('')[0].toUpperCase() + color.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() =>
                    props.title === 'Edit' ? handleEditButton() : handleCreateButton()
                  }
                  isLoading={buttonLock}
                  type="submit"
                  className="h-11 w-full rounded-lg  bg-custom-pink text-[#282828] font-bold mr-2"
                >
                  {props.title === 'Edit' ? 'Submit' : 'Create'}
                </Button>
                <Button
                  disabled={buttonLock}
                  onClick={onClose}
                  className="h-11 w-full rounded-lg  bg-custom-green text-[#282828] font-bold mr-2"
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

export default ListModalWindow;
