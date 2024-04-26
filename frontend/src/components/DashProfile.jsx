import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signInSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from '../redux/user/userSlice';
import 'react-circular-progressbar/dist/styles.css';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
const DashProfile = () => {
  //this are states for img upload functionality..

  const fileRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imagePerc, setImagePerc] = useState(null);
  const [fileUploadError, setfileUploadError] = useState(null);
  const [imageUploadLoaing, setImageUploadLoaing] = useState(false);

  // this is for update user profile..

  const [formData, setformData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(null);

  //this is for delete functionality
  const [showModal, setShowModal] = useState(false);

  const {
    currentUser,
    error: errorMessage,
    loading,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setfileUploadError(null);

    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  //upload image on firebase

  const uploadImage = async () => {
    setImageUploadLoaing(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePerc(Math.round(progress));
      },
      (error) => {
        setfileUploadError(
          'Could not upload image (File must be less than 2MB  )',
        );
        setImageUploadLoaing(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, photo: downloadURL });
          setImagePerc(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImageUploadLoaing(false);
        });
      },
    );
  };

  // submit form data for update profile

  const handleOnSubmit = async (e) => {
    if (Object.keys(formData).length === 0) return;
    setSuccess(null);

    e.preventDefault();

    try {
      dispatch(updateStart());

      const res = await fetch(`/api/v1/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateFailure(data.message));
      }

      if (res.ok) {
        dispatch(updateSuccess(data.user));
        setSuccess(`User's Profile Successfully Updated!`);
      }
    } catch (error) {
      dispatch(updateFailure(data.message));
    }
  };

  const handleOnChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  // this is for sign out

  const handleOnSignOut = async () => {
    const res = await fetch('/api/v1/auth/signout');

    if (res.ok) {
      localStorage.clear();
      dispatch(signInSuccess(null));
      navigate('/sign-in');
    }
  };
  const handleOnDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`);

      if (res.ok) {
        localStorage.clear();
        dispatch(deleteUserSuccess(null));
        navigate('/sign-in');
      }
    } catch (error) {
      deleteUserFailure(data.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto w-full p-3'>
      <input
        ref={fileRef}
        hidden
        type='file'
        accept='image/*'
        onChange={handleImageChange}
      />
      <h1 className='text-center font-semibold text-3xl my-7'>Profile</h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
        <div
          className='w-32 h-32 self-center relative cursor-pointer rounded-full shadow-md hover:shadow-lg overflow-hidden'
          onClick={() => fileRef.current.click()}
        >
          {imagePerc && (
            <CircularProgressbar
              value={imagePerc || 0}
              text={`${imagePerc}%`}
              strokeWidth={4}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },

                path: {
                  stroke: `rgba(62,152,199,${imagePerc / 100}`,
                },
              }}
            />
          )}{' '}
          <img
            src={imageFileUrl || currentUser.photo}
            alt='Profile'
            className={`rounded-full border-2 object-cover  h-full w-full  border-[lightgray] cursor-pointer ${
              imagePerc && imagePerc < 100 && 'opacity-60'
            }`}
          />
        </div>

        {fileUploadError && <Alert color='failure'>{fileUploadError}</Alert>}

        <TextInput
          onChange={handleOnChange}
          type='text'
          defaultValue={currentUser.username}
          placeholder='username'
          id='username'
        />
        <TextInput
          onChange={handleOnChange}
          type='text'
          defaultValue={currentUser.email}
          placeholder='email'
          id='email'
        />
        <TextInput
          onChange={handleOnChange}
          type='password'
          placeholder='password'
          id='password'
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          className='uppercase'
          disabled={imageUploadLoaing || loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        <Link to={'/create-post'}>
          <Button
            type='button'
            gradientDuoTone='purpleToPink'
            outline
            className='uppercase w-full'
          >
            create a post
          </Button>
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          className='text-red-700 cursor-pointer'
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </span>
        <span onClick={handleOnSignOut} className='text-red-700 cursor-pointer'>
          Sign Out
        </span>
      </div>
      {errorMessage && (
        <Alert className='mt-4' color='failure'>
          {errorMessage}
        </Alert>
      )}
      {success && <Alert className='mt-4'>{success}</Alert>}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={'md'}
        className='w-full'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
          </div>
          <div className='flex justify-center gap-4 '>
            <Button color='failure' onClick={handleOnDelete}>
              {"Yes, I'm sure"}
            </Button>
            <Button color='gray' onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
