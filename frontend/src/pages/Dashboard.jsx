import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import { useSelector } from 'react-redux';
import DashUser from '../components/DashUser';
import DashComments from '../components/DashComments';
import { Navigate } from 'react-router-dom';
import DashBoardCom from '../components/DashBoardCom';

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
      {tab === 'dashboard' && <DashBoardCom />}
      {tab === 'post' && <DashPosts />}
      {tab === 'comment' && <DashComments />}
      {(currentUser.isAdmin && tab === 'user' && <DashUser />) ||
        (!currentUser.isAdmin && tab === 'user' && (
          <Navigate to={'/dashboard'} />
        ))}
    </div>
  );
};

export default Dashboard;
