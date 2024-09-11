'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Color } from '@/types';
import { Tooltip } from '@nextui-org/react';
import { useLists } from '@/app/(main)/provider';
import ListModalWindow from './ListModalWindow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LIST_COLORS_OBJ: Record<Color, string> = {
  lime: 'border-lime-300',
  green: 'border-green-600',
  orange: 'border-orange-600',
  purple: 'border-purple-400',
  red: 'border-red-600',
  yellow: 'border-yellow-600',
  blue: 'border-sky-500',
};

const Aside = () => {
  const router = useRouter();

  const { lists } = useLists();

  const [asideIsOpen, setAsideIsOpen] = useState(false);

  return (
    <aside
      className={`${
        asideIsOpen ? 'w-[200px]' : 'w-[64px] items-center'
      } ease-out transition-width duration-400 px-2 hidden sm:flex flex-col items-center bg-content3 shadow-lg z-20 top-0 sticky h-screen`}
    >
      <div
        onClick={() => router.push('/')}
        className="font-bold text-lg text-center mt-2 mb-3  truncate cursor-pointer"
      >
        {asideIsOpen ? 'ToDoS' : 'TDS'}
      </div>
      <div className="overflow-y-auto mb-2 md:px-2">
        {lists && <ListModalWindow asideIsOpen={asideIsOpen} title="Create" />}
        {lists?.map((el, indx) => (
          <Tooltip
            key={el.id}
            content={el.name}
            placement="right"
            classNames={{
              base: [
                `${asideIsOpen && 'hidden'} bg-content3 border-2 rounded-xl  ${
                  LIST_COLORS_OBJ[el.color]
                }`,
              ],
              content: ['py-2 px-4 shadow-xl', 'text-content4 bg-content3'],
            }}
          >
            <div
              color={el.name}
              onClick={() => router.push(`/${el.id}`)}
              className={`${
                asideIsOpen ? 'w-40' : 'w-10 uppercase'
              } flex ease-in-out justify-center transition-size duration-500 text-xl items-center h-10 font-medium truncate border-2 cursor-pointer ${
                lists.length - 1 === indx ? 'mt-2' : 'my-2'
              } ${LIST_COLORS_OBJ[el.color]} rounded-md`}
            >
              {asideIsOpen ? el.name : el.name.split('')[0]}
            </div>
          </Tooltip>
        ))}
      </div>
      <Tooltip
        content="Open menu"
        placement="right"
        classNames={{
          base: [`${asideIsOpen && 'hidden'} bg-content3 border-2 rounded-xl border-pink-500`],
          content: ['py-2 px-4 shadow-xl', 'text-content4'],
        }}
      >
        <div
          onClick={() => setAsideIsOpen(!asideIsOpen)}
          className={`${
            asideIsOpen ? 'w-40' : 'w-10'
          } min-h-10 flex ease-in-out transition-size duration-500 justify-center items-center border-2 mb-2.5 cursor-pointer border-pink-500 rounded-md`}
        >
          <ArrowBackIcon className={asideIsOpen ? '' : 'rotate-180'} />
        </div>
      </Tooltip>
    </aside>
  );
};

export default Aside;
