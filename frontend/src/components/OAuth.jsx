import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);

      dispatch(signInStart());

      const res = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data.User));
       return navigate('/');
      }
    } catch (error) {
      return dispatch(signInFailure(data.message));
    }
  };

  return (
    <Button
      type='button'
      gradientDuoTone='pinkToOrange'
      outline
      onClick={handleOnGoogle}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  );
};

export default OAuth;
