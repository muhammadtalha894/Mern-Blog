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
  return (
    <>
      <Sidebar aria-label='Default sidebar example ' className='w-full md:w-56'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to={'/dashboard?tab=dashboard'}>
              <Sidebar.Item active={tab === 'dashboard'} icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
            </Link>
            <div></div>

            <Link to={'/dashboard?tab=profile'}>
              <Sidebar.Item
                active={tab === 'profile'}
                icon={HiUser}
                label={'admin'}
                labelColor='dark'
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item href='#' icon={HiArrowSmRight}>
              Sign out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default DashSideBar;
