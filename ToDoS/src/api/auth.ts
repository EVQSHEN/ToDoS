import axios from 'axios';

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export const signUpFetch = async (formState: SignupProps) => {
  const { data } = await axios.post(`authorization/signup`, formState);

  return data;
};

export const signInFetch = async (formState: LoginProps) => {
  const { data } = await axios.post(`authorization/signin`, formState);

  return data;
};
