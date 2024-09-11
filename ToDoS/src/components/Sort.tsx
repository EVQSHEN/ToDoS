'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectItem } from '@nextui-org/react';

export const SORT = ['DEFAULT', 'TODAY', 'COMPLETED', 'NOT COMPLETED', 'DATE ASC', 'DATE DESC'];

const Sort: React.FC<{ isDisabled: boolean }> = ({ isDisabled }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortParams = searchParams.get('sort');

  return (
    <div className=" mb-4 sm:mb-3 min-w-44 sm:min-w-56 max-w-72">
      <Select
        isDisabled={isDisabled}
        className="w-full flex items-center"
        defaultSelectedKeys=""
        selectedKeys={[sortParams ? sortParams.replace('_', ' ').toUpperCase() : 'DEFAULT']}
        labelPlacement="outside-left"
        label="Sort:"
        classNames={{
          trigger: 'bg-selectTriggerBackground',
          popoverContent: 'bg-selectTriggerBackground',
        }}
      >
        {SORT.map((el) => (
          <SelectItem
            onClick={() =>
              router.push(
                `?sort=${
                  el.toLocaleLowerCase() === 'default'
                    ? 'default'
                    : el.replace(' ', '_').toLocaleLowerCase()
                }`,
              )
            }
            key={el}
          >
            {el}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Sort;
