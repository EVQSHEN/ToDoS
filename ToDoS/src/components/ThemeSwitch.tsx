'use client';
import { FC } from 'react';
import clsx from 'clsx';
import { useIsSSR } from '@react-aria/ssr';
import { useTheme } from 'next-themes';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { SwitchProps, useSwitch } from '@nextui-org/switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export interface Props {
  className?: string;
  classNames?: SwitchProps['classNames'];
}

export const ThemeSwitch: FC<Props> = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: theme === 'light' || isSSR,
    'aria-label': `Switch to ${theme === 'light' || isSSR ? 'dark' : 'light'} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          'px-px transition-opacity hover:opacity-80 cursor-pointer',
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'w-auto h-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'mr-2',
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR ? <WbSunnyIcon /> : <DarkModeIcon />}
      </div>
    </Component>
  );
};
