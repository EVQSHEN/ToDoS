'use client';
import { useEffect, useReducer, useState } from 'react';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { deleteListFetch, userFetch } from '@/api';
import { useLists } from '@/app/(main)/provider';
import { Color, List, User } from '@/types';
import {
  Avatar,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import { ThemeSwitch } from './ThemeSwitch';
import ListModalWindow from './ListModalWindow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const LIST_COLORS_OBJ: Record<Color, string> = {
  lime: 'border-lime-300',
  green: 'border-green-600',
  orange: 'border-orange-600',
  purple: 'border-purple-400',
  red: 'border-red-600',
  yellow: 'border-yellow-600',
  blue: 'border-sky-500',
};

const Header = () => {
  const params = useParams();
  const router = useRouter();

  const [userData, setUserData] = useState<User>();
  const [listData, setListData] = useState<List>();
  const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);

  const { lists, getLists } = useLists();

  const getUser = async () => {
    try {
      const task = await userFetch();

      setUserData(task);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    }
  };

  const deleteList = async () => {
    try {
      await deleteListFetch(params.id);

      await getLists();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setListData(undefined);

    if (params.id && lists) {
      setListData(lists.filter((list) => list.id === Number(params.id))[0]);
    }
  }, [params, lists]);

  return (
    <div className="h-16 sm:h-11 pr-2 sm:p-2 w-full flex justify-between items-center top-0 sticky bg-background z-10">
      <div className="flex items-center">
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className="block sm:hidden"
        >
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle />
          </NavbarContent>
          <div className="flex items-center">
            <h2 className=" sm:hidden uppercase w-fit max-w-40 truncate mr-2 text-lg text-nowrap">
              {listData?.name ? listData.name : 'Main'} LIST
            </h2>
            {params?.id && (
              <div className="block sm:hidden">
                <ListModalWindow title="Edit" form={listData} />
                <DeleteOutlineOutlinedIcon
                  onClick={() => {
                    deleteList();
                    router.push('/');
                  }}
                  className="hover:fill-custom-pink cursor-pointer"
                />
              </div>
            )}
          </div>

          <NavbarMenu>
            {lists && (
              <NavbarMenuItem>
                <ListModalWindow
                  click={setIsMenuOpen}
                  asideIsOpen={true}
                  title="Create"
                  type={true}
                />
              </NavbarMenuItem>
            )}
            <NavbarMenuItem>
              <div
                onClick={() => {
                  setIsMenuOpen();
                  router.push('/');
                }}
                className={`w-full flex ease-in-out justify-center transition-all duration-500 text-xl items-center h-14 truncate border-2 cursor-pointer border-lime-600 rounded-md`}
              >
                Main list
              </div>
            </NavbarMenuItem>
            {lists?.map((el) => (
              <NavbarMenuItem key={el.id + '-' + el.userId}>
                <div
                  color={el.name}
                  onClick={() => {
                    setIsMenuOpen();
                    router.push(`/${el.id}`);
                  }}
                  className={`w-full flex ease-in-out justify-center transition-all duration-500 text-xl items-center h-14 truncate border-2 cursor-pointer ${
                    LIST_COLORS_OBJ[el.color]
                  } rounded-md`}
                >
                  {el.name}
                </div>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
        <h2 className="hidden sm:block uppercase w-fit max-w-80 truncate text-lg mr-3 text-nowrap">
          {listData?.name ? listData.name : 'Main'} LIST
        </h2>
        {params?.id && (
          <div className="hidden sm:block">
            <ListModalWindow title="Edit" form={listData} />
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                deleteList();
                router.push('/');
              }}
              className="hover:fill-custom-pink cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="flex items-center">
        <ThemeSwitch />
        {userData && <Avatar size="sm" className="mr-3 hidden sm:block" name={userData.name} />}
        <ExitToAppIcon
          className="cursor-pointer w-5.5 hover:fill-custom-pink"
          onClick={() => {
            Cookies.remove('token');
            router.push('/login');
          }}
        />
      </div>
    </div>
  );
};

export default Header;
