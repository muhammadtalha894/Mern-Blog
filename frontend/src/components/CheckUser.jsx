import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const CheckUser = () => {
  const { currentUser } = useSelector((state) => state.user);

  return <>{!currentUser ? <Outlet /> : <Navigate to={'/dashboard?tab=profile'} />}</>;
};

export default CheckUser;
