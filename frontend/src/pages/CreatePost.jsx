import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const CreatePost = () => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formDetails, setFormDetails] = useState({});
  const [PublishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = () => {
    try {
      if (!file) {
        setImageUploadError('Please Select an image');
        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed ');
          setImageUploadProgress(0);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(0);
            setImageUploadError(null);
            setFile(null);
            setFormDetails({ ...formDetails, image: downloadURL });
          });
        },
      );
    } catch (error) {
      setImageUploadError('Image upload failed ');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleOnPostSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDetails),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.savedPost.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong!');
    }
  };

  return (
    <>
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create a Post
        </h1>
        <form onSubmit={handleOnPostSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Title'
              required
              className='flex-1'
              id='title'
              onChange={(e) =>
                setFormDetails({ ...formDetails, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormDetails({ ...formDetails, category: e.target.value })
              }
            >
              <option value='uncategorized'>Select a Category</option>
              <option value='javascript'>Javascript</option>
              <option value='python'>Python </option>
              <option value='Reactjs'>React.js</option>
              <option value='Nodejs'>Node.js</option>
              <option value='Nextjs'>Next.js</option>
            </Select>
          </div>

          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size={'sm'}
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress > 0 ? 'Uploading....' : 'Upload Image'}
            </Button>
          </div>

          {imageUploadError && (
            <Alert color='failure'>{imageUploadError}</Alert>
          )}

          {formDetails.image && <img src={formDetails.image} alt='image' />}

          <ReactQuill
            theme='snow'
            className='h-72 mb-12'
            placeholder='Write something... '
            onChange={(value) =>
              setFormDetails({ ...formDetails, content: value })
            }
            required
          />
          <Button type='submit' gradientDuoTone={'purpleToPink'}>
            Publish
          </Button>

          {PublishError && <Alert color='failure'>{PublishError}</Alert>}
        </form>
      </div>
    </>
  );
};

export default CreatePost;
