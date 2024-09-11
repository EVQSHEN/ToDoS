import React from 'react';
import { Spinner } from '@nextui-org/react';

const Loading = () => {
  return (
    <Spinner
      className="h-[calc(100%-160px)] w-full absolute flex justify-center items-center"
      color="default"
      label="Loading..."
      size="lg"
    />
  );
};

export default Loading;
