import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import { useSelector } from 'react-redux';
import DashUser from '../components/DashUser';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

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
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='md:w-56'>
        <DashSideBar />
      </div>
      {tab === 'profile' && <DashProfile />}
      {tab === 'post' && <DashPosts />}
      {currentUser.isAdmin && tab === 'user' && <DashUser />}
    </div>
  );
};

export default Dashboard;
