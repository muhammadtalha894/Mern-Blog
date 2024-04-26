import { Sidebar } from 'flowbite-react';
import {
  HiChartPie,
  HiUser,
  HiArrowRight,
  HiArrowSmRight,
} from 'react-icons/hi';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashSideBar = () => {
  const location = useLocation();

  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  const { currentUser } = useSelector((state) => state.user);

  const handleOnDelete = async () => {
    const res = await fetch(`/api/v1/user/delete/${currentUser._id}`);

    if (res.ok) {
      localStorage.clear();
      disptach(signInSuccess(null));
      navigate('/sign-in');
    }
  };
  return (
    <>
      <Sidebar aria-label='Default sidebar example ' className='w-full md:w-56'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to={'/dashboard?tab=dashboard'}>
              <Sidebar.Item
                active={tab === 'dashboard'}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            <div></div>

            <Link to={'/dashboard?tab=profile'}>
              <Sidebar.Item
                as='div'
                active={tab === 'profile'}
                icon={HiUser}
                label={'admin'}
                labelColor='dark'
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item
              href='#'
              icon={HiArrowSmRight}
              onClick={handleOnDelete}
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
