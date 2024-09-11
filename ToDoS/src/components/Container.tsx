'use client';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ className, children }) => {
  return <div className={`mx-2 ${className}`}>{children}</div>;
};

export default Container;
