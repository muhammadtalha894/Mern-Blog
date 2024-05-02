import { useEffect, useState } from 'react';
import { Table, Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const DashComment = () => {
  const [Comments, setComments] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const userPostCommentsFetch = async () => {
      try {
        const res = await fetch(
          `/api/v1/comment/getallcomments?userId=${currentUser._id}`,
        );
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!currentUser.isAdmin) {
      userPostCommentsFetch();
    }

    const AdminPostCommentsFetch = async () => {
      try {
        const res = await fetch('/api/v1/comment/getallcomments');
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      AdminPostCommentsFetch();
    }
  }, []);

  const handleOnCommentDelete = async () => {
    try {
      const res = await fetch(`/api/v1/comment/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postUserId: postIdToDelete,
          commentId: commentIdToDelete,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((com) => com._id !== commentIdToDelete),
        );
        setConfirmDelete(false);
      }
      if (!res.ok) {
        console.log(data.message);
        setConfirmDelete(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {Comments && Comments.length > 0 && (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-thumb-slate-300 dark:scrollbar-thumb-state-700 w-full'>
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Data Created</Table.HeadCell>
              <Table.HeadCell>Content Title</Table.HeadCell>
              <Table.HeadCell>Number OF Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              {currentUser.isAdmin && <Table.HeadCell>userId</Table.HeadCell>}
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {Comments &&
                Comments.length > 0 &&
                Comments.map((comment) => (
                  <Table.Row
                    key={comment._id}
                    className='bg-white dark:border-gray-700 dark:bg-gray-800 '
                  >
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white '>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell className=''>{comment.content}</Table.Cell>
                    <Table.Cell>{comment.numOfLikes}</Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    {currentUser.isAdmin && (
                      <Table.Cell>{comment.userId}</Table.Cell>
                    )}
                    <Table.Cell>
                      <span
                        className='text-red-700 cursor-pointer font-semibold'
                        onClick={() => {
                          setCommentIdToDelete(comment._id);
                          setPostIdToDelete(comment.postId);
                          setConfirmDelete(true);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
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
                <Button color='failure' onClick={handleOnCommentDelete}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color='gray' onClick={() => setConfirmDelete(false)}>
                  No, cancel
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default DashComment;
