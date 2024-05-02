import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signInSuccess } from '../redux/user/userSlice';

export const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const serachTermFromUrl = urlParams.get('searchTerm');

    if (serachTermFromUrl) {
      setSearchTerm(serachTermFromUrl);
    }
  }, [location.search]);

  const handleOnSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const { currentUser } = useSelector((state) => state.user);

  const { theme } = useSelector((state) => state.theme);

  const navigate = useNavigate();

  const handleOnSignOut = async () => {
    const res = await fetch('/api/v1/auth/signout');

    if (res.ok) {
      localStorage.clear();
      dispatch(signInSuccess(null));
      navigate('/sign-in');
    }
  };

  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 bg-pink-500 rounded-lg text-white '>
          Talha's
        </span>
        Blog
      </Link>
      <form onSubmit={handleOnSearch}>
        <TextInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type='text'
          placeholder='Search'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className=' w-12 h-10  lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-4 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'dark' ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='User' img={currentUser.photo} rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=dashboard'}>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>

            <Dropdown.Divider />
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleOnSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
