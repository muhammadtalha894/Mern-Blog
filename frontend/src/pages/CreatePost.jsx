import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

const CreatePost = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create a Post
        </h1>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Title'
              required
              className='flex-1'
              id='title'
            />
            <Select>
              <option value='uncategorized'>Select a Category</option>
              <option value='javascript'>Javascript</option>
              <option value='python'>Python </option>
              <option value='Reactjs'>React.js</option>
              <option value='Nodejs'>Node.js</option>
              <option value='Nextjs'>Next.js</option>
            </Select>
          </div>

          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type='file' accept='image/*' />
            <Button type='button' gradientDuoTone='purpleToBlue' size={'sm'}>
              {' '}
              Upload image
            </Button>
          </div>
          <ReactQuill
            theme='snow'
            className='h-72 mb-12'
            placeholder='Write something... '
            value={value}
            onChange={setValue}
            required
          />
          <Button type='submit' gradientDuoTone={'purpleToPink'}>
            Publish
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
