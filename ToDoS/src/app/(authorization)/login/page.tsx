'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { signInFetch } from '@/api';
import validateInput from '@/utils/validateInput';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const BODY_FORM = {
  email: '',
  password: '',
};

export default function Login() {
  const router = useRouter();

  const [formState, setFormState] = useState(BODY_FORM);
  const [errorState, setErrorState] = useState({ password: false, email: false });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [buttonLock, setButtonLock] = useState(false);

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  const handleButton = async (e: { preventDefault: () => void }) => {
    setButtonLock(!buttonLock);

    setErrorState({
      ...errorState,
      email: validateInput(formState.email),
      password: validateInput(formState.password),
    });

    if (formState.email !== '' && formState.password !== '') {
      await signInFunc(formState);
    }

    setButtonLock(buttonLock);
  };

  const signInFunc = async (formState: typeof BODY_FORM) => {
    try {
      const data = await signInFetch(formState);

      Cookies.set('token', data.token);

      router.push('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Sign in to ToDoS</h2>
      <div className="flex flex-col justify-center items-center">
        <Input
          type="email"
          label="Email"
          size="md"
          radius="sm"
          isInvalid={errorState.email}
          errorMessage="Please enter a valid email"
          className="w-80 h-15 rounded-lg text-[#282828]"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <Input
          label="Password"
          size="md"
          radius="sm"
          isInvalid={errorState.password}
          errorMessage="Please enter a valid passwird"
          className="w-80 h-15 rounded-lg text-[#282828] mb-3"
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

        <div className="flex flex-col justify-center items-center">
          <Button
            onClick={handleButton}
            isLoading={buttonLock}
            type="submit"
            className="w-60 h-12 rounded-lg mb-1 bg-custom-pink text-[#282828] font-bold"
          >
            Sign in
          </Button>

          <div
            className="w-60 py-3 text-center cursor-pointer text-sm"
            onClick={() => router.push('/signup')}
          >
            Sign up
          </div>
        </div>
      </div>
    </>
  );
}
