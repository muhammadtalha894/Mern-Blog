import { Sidebar } from 'flowbite-react';
import {
  HiChartPie,
  HiUser,
  HiArrowRight,
  HiArrowSmRight,
  HiDocument,
  HiDocumentText,
} from 'react-icons/hi';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const DashSideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  const { currentUser } = useSelector((state) => state.user);

  const handleOnSignOut = async () => {
    const res = await fetch('/api/v1/auth/signout');

    if (res.ok) {
      localStorage.clear();
      dispatch(signInSuccess(null));
      navigate('/sign-in');
    }
  };
  return (
    <>
      <Sidebar aria-label='Default sidebar example ' className='w-full md:w-56'>
        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to={'/dashboard?tab=dashboard'}>
              {currentUser.isAdmin && (
                <Sidebar.Item
                  active={tab === 'dashboard'}
                  icon={HiChartPie}
                  as='div'
                >
                  Dashboard
                </Sidebar.Item>
              )}
            </Link>

            <Link to={'/dashboard?tab=profile'}>
              <Sidebar.Item
                as='div'
                active={tab === 'profile'}
                icon={HiUser}
                label={currentUser.isAdmin ? 'Admin' : 'User'}
                labelColor='dark'
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to={'/dashboard?tab=post'}>
              <Sidebar.Item
                as='div'
                active={tab === 'post'}
                icon={HiDocumentText}
                labelColor='dark'
              >
                Posts
              </Sidebar.Item>
            </Link>
            <Sidebar.Item
              href='#'
              icon={HiArrowSmRight}
              onClick={handleOnSignOut}
            >
              Sign out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default DashSideBar;
