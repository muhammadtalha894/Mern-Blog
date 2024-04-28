import { useEffect, useState } from 'react';
import { Table, Button } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const DashUser = () => {
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userIdToDelete, setuserIdToDelete] = useState(null);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const userFetch = async () => {
      try {
        const res = await fetch('/api/v1/user/users');
        const data = await res.json();

        if (data && data.users.length < 10) {
          setShowMore(false);
        }

        if (data && data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userFetch();
  }, []);

  const handleOnDeleteUser = async () => {
    try {
      const res = await fetch(`/api/v1/user/deleteAdmin/${userIdToDelete}`);
      if (res.ok) {
        setUsers((prev) => prev.filter((pre) => pre._id !== userIdToDelete));
        setuserIdToDelete(null);
        setConfirmDelete(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnShowMore = async () => {
    const startIndex = users && users.length;
    try {
      const res = await fetch(`/api/v1/user/users?startIndex=${startIndex}`);
      const data = await res.json();

      if (data && data.users.length < 10) {
        setShowMore(false);
      }
      if (res.ok) {
        setUsers([...users, ...data.users]);
        setuserIdToDelete(null);
        setConfirmDelete(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {users && users.length > 0 && (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-thumb-slate-300 dark:scrollbar-thumb-state-700 w-full'>
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Data Created</Table.HeadCell>
              <Table.HeadCell>user Image</Table.HeadCell>
              <Table.HeadCell>username</Table.HeadCell>
              <Table.HeadCell>email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <Table.Row
                    key={user._id}
                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>
                      <img
                        src={user.photo}
                        alt={user.username}
                        className='w-10 h-10 rounded-full'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {' '}
                      {user.isAdmin ? (
                        <FaCheck className='text-green-700' />
                      ) : (
                        <FaTimes className='text-red-700' />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className='text-red-700 cursor-pointer font-semibold'
                        onClick={() => {
                          setuserIdToDelete(user._id);
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
                <Button color='failure' onClick={handleOnDeleteUser}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color='gray' onClick={() => setConfirmDelete(false)}>
                  No, cancel
                </Button>
              </div>
            </Modal.Body>
          </Modal>

          {showMore && (
            <button
              onClick={handleOnShowMore}
              className='w-full cursor-pointer text-teal-500 py-7 text-sm self-center'
            >
              Show More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default DashUser;
