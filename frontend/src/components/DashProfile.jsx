import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { Button, TextInput } from 'flowbite-react';
const DashProfile = () => {
  const fileRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto w-full p-3'>
      <input ref={fileRef} hidden type='file' />
      <h1 className='text-center font-semibold text-3xl my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-34 h-34 self-center'>
          <img
            src={currentUser.photo}
            alt='Profile'
            onClick={() => fileRef.current.click()}
            className='rounded-full border-8 border-[lightgray] cursor-pointer shadow-md hover:shadow-lg'
          />
        </div>

        <TextInput
          type='text'
          defaultValue={currentUser.username}
          placeholder='username'
          id='username'
        />
        <TextInput
          type='text'
          defaultValue={currentUser.email}
          placeholder='email'
          id='email'
        />
        <TextInput type='password' placeholder='password' id='password' />
        <Button gradientDuoTone='purpleToBlue' className='uppercase'>
          Update
        </Button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
