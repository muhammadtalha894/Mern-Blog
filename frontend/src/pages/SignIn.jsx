import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';

const SignIn = () => {
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields!'));
    }
    try {
      dispatch(signInStart());

      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data.User));
        return navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col  md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link
            to='/'
            className='self-center whitespace-nowrap  font-semibold dark:text-white  text-4xl'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 bg-pink-500 rounded-lg text-white '>
              Talha's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is the demo project. You can sign in with your email and
            password or with Google. And create your blog.{' '}
          </p>
        </div>

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleOnSubmit}>
            <div>
              <Label value='Your Email' />
              <TextInput
                onChange={handleOnChange}
                type='email'
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleOnChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  {' '}
                  <Spinner size={'sm'} />
                  <span>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5 '>
            <span>Dont have an account?</span>{' '}
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
