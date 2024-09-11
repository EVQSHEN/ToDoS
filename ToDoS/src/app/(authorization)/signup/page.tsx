'use client';
import React, {useState} from 'react';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { signUpFetch } from '@/api';
import validateInput from '@/utils/validateInput';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const BODY_FORM = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
};
export default function Signup() {
  const router = useRouter();

  const [formState, setFormState] = useState(BODY_FORM);
  const [errorState, setErrorState] = useState({ password: false, email: false, name: false });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [buttonLock, setButtonLock] = useState(false);

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  const handleButton = async (e: { preventDefault: () => void }) => {
    setButtonLock(!buttonLock);

    setErrorState({
      ...errorState,
      name: validateInput(formState.name),
      email: validateInput(formState.email),
      password:
        formState.password.trim() === '' || formState.password !== formState.confirmPassword,
    });

    if (formState.confirmPassword !== formState.password) {
      return toast.error('Password is incorrect');
    } else {
      await signUpFunc(formState);
    }

    setButtonLock(buttonLock);
  };

  const signUpFunc = async (formState: typeof BODY_FORM) => {
    try {
      const data = await signUpFetch(formState);

      Cookies.set('token', data.token);

      router.push('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Sign up to ToDoS</h2>
      <div className="flex flex-col justify-center items-center">
        <Input
          label="Name"
          size="md"
          radius="sm"
          errorMessage="Please enter your name."
          isInvalid={errorState.name}
          className="w-80 h-15 rounded-lg text-[#282828]"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />

        <Input
          type="email"
          label="Email"
          size="md"
          radius="sm"
          isInvalid={errorState.email}
          errorMessage="Please enter a valid email."
          className="w-80 h-15 rounded-lg text-[#282828]"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <Input
          label="Password"
          size="md"
          radius="sm"
          errorMessage="Please enter a valid email"
          className="w-80 h-15 rounded-lg text-[#282828]"
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisiblePassword ? (
                <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisiblePassword ? 'text' : 'password'}
        />
        <Input
          label="Confirm your password"
          size="md"
          radius="sm"
          errorMessage="Passwords don't match."
          className="w-80 h-15 rounded-lg text-[#282828] mb-3"
          isInvalid={errorState.password}
          value={formState.confirmPassword}
          onChange={(e) => setFormState({ ...formState, confirmPassword: e.target.value })}
          type={isVisiblePassword ? 'text' : 'password'}
        />
        <div className="flex flex-col justify-center items-center">
          <Button
            onClick={handleButton}
            isLoading={buttonLock}
            type="submit"
            className="w-60 h-12 rounded-lg mb-1 bg-custom-green text-[#282828] font-bold text-center py-3"
          >
            Sign up
          </Button>
          <div
            className="w-60 py-3 text-center cursor-pointer text-sm"
            onClick={() => router.push('/login')}
          >
            Sign in
          </div>
        </div>
      </div>
    </>
  );
}
