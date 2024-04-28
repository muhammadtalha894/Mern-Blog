import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await fetch(
        `/api/v1/post/getposts?userId=${currentUser._id}`,
      );
      const data = await res.json();

      if (data && data.posts.length < 9) {
        setShowMore(false);
      }

      setPosts(data.posts);
    };

    if (!currentUser.isAdmin) {
      fetchUserPosts();
    }
    const fetchAdminAllPosts = async () => {
      try {
        const res = await fetch(`/api/v1/post/getposts`);
        const data = await res.json();

        if (data && data.posts.length < 9) {
          setShowMore(false);
        }

        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchAdminAllPosts();
    }
  }, [currentUser._id]);

  const handleOnShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `/api/v1/post/getposts?startIndex=${startIndex}&userId=${currentUser._id}`,
      );
      const data = await res.json();
      const post = data && data.posts;

      if (data && data.posts.length < 9) {
        setShowMore(false);
      }

      setPosts([...posts, ...post]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnShowMoreAdmin = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(`/api/v1/post/getposts?startIndex=${startIndex}`);
      const data = await res.json();
      const post = data && data.posts;

      if (data && data.posts.length < 9) {
        setShowMore(false);
      }

      setPosts([...posts, ...post]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDeletePost = async () => {
    try {
      const res = await fetch(`/api/v1/post/delete/${postIdToDelete}`);
      if (res.ok) {
        setPosts((prev) => prev.filter((pre) => pre._id !== postIdToDelete));
        setPostIdToDelete(null);
        setConfirmDelete(false);
      }

      if (posts < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts && posts.length > 0 ? (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-thumb-slate-300 dark:scrollbar-thumb-state-700 w-full'>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className='uppercase'>
                Data Updated
              </Table.HeadCell>
              <Table.HeadCell className='uppercase'>Post image</Table.HeadCell>
              <Table.HeadCell className='uppercase'>Post title</Table.HeadCell>
              <Table.HeadCell className='uppercase'>Category</Table.HeadCell>
              <Table.HeadCell className='uppercase'>Delete</Table.HeadCell>
              <Table.HeadCell className='uppercase'>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {posts &&
                posts.map((post) => (
                  <>
                    {' '}
                    <Table.Row
                      key={post._id}
                      className='bg-white dark:border-gray-700 dark:bg-gray-800'
                    >
                      <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          {' '}
                          <img
                            src={post.image}
                            alt={post.title}
                            className='w-20 h-10 object-cover bg-gray-500'
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          to={`/post/${post.slug}`}
                          className='font-semibold text-gray-900 dark:text-white'
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <Link
                          className='text-teal-500 : hover:underline'
                          to={`/update-post/${post._id}`}
                        >
                          <span>Edit</span>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className='font-medium text-red-500 hover:underline cursor-pointer'
                          onClick={() => {
                            setPostIdToDelete(post._id);
                            setConfirmDelete(true);
                          }}
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </>
                ))}
            </Table.Body>
          </Table>
          {showMore && !currentUser.isAdmin && (
            <button
              onClick={handleOnShowMore}
              className='w-full cursor-pointer text-teal-500 py-7 text-sm self-center'
            >
              Show More
            </button>
          )}
          {showMore && currentUser.isAdmin && (
            <button
              onClick={handleOnShowMoreAdmin}
              className='w-full cursor-pointer text-teal-500 py-7 text-sm self-center'
            >
              Show More
            </button>
          )}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center m-auto '>
          <h1 className='text-3xl'>You Have No Post Yet!</h1>
          <Link to={'/create-post'} className='text-teal-500 hover:underline'>
            Create a Post
          </Link>
        </div>
      )}
      <Modal
        show={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        popup
        size={'md'}
        className='w-full'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your post?
            </h3>
          </div>
          <div className='flex justify-center gap-4 '>
            <Button color='failure' onClick={handleOnDeletePost}>
              {"Yes, I'm sure"}
            </Button>
            <Button color='gray' onClick={() => setConfirmDelete(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashPosts;
