import { FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import UpdatePostComment from './UpdatePostComment';

const Comment = ({
  comment,
  handleOnCommentDelete,
  handleOnLike,
  handleOnUpdatedComment,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [updatecomment, setUpdateComment] = useState(false);
  const [updatedComment, setUpdatedComment] = useState('');

  const handleOnCommentChange = (e) => {
    setUpdatedComment(e.target.value);
  };

  const handleOnCommentSubmit = async (e, commentId) => {
    e.preventDefault();

    // if (updatedComment.length > 200 || updatedComment.length < 1) return;
    try {
      const res = await fetch(
        `/api/v1/comment/update/${commentId}/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: updatedComment }),
        },
      );

      const data = await res.json();
      if (res.ok) {
        handleOnUpdatedComment(commentId, data.comment);
        setUpdateComment(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          src={comment.userId.photo}
          alt={comment.userId.username}
          className='w-10 h-10 rounded-full bg-gray-200'
        />
      </div>

      <div className='flex-1'>
        <div className='flex items-center mb-1 '>
          <span className='font-bold mr-1 truncate text-xs'>
            {' '}
            @{comment.userId.username || 'anomymous user'}{' '}
          </span>
          <span className='font-normal'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {updatecomment ? (
          <UpdatePostComment
            comment={comment}
            setUpdateComment={setUpdateComment}
            handleOnCommentChange={handleOnCommentChange}
            handleOnCommentSubmit={handleOnCommentSubmit}
          />
        ) : (
          <>
            <p className='text-sm mb-4 '>{comment.content}</p>
            <div className='flex items-center gap-2 p-3 border-t dark:border-gray-600 w-44 text-sm text-gray-500'>
              <button
                onClick={() => handleOnLike(comment._id)}
                className={` cursor-pointer ${
                  comment.likes.includes(currentUser._id) && 'text-cyan-600'
                } `}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              {comment.numOfLikes > 0 && (
                <>
                  {' '}
                  <span>
                    {comment.numOfLikes}{' '}
                    {comment.numOfLikes === 1 ? 'like' : 'likes'}
                  </span>{' '}
                </>
              )}

              {(currentUser.isAdmin ||
                currentUser._id === comment.userId._id) && (
                <>
                  <span
                    onClick={() => setUpdateComment(true)}
                    className=' hover:text-cyan-500 cursor-pointer'
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => {
                      handleOnCommentDelete(comment._id, comment.userId._id);

                      console.log(comment._id, comment.userId._id);
                    }}
                    className='cursor-pointer hover:text-red-600'
                  >
                    Delete
                  </span>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
