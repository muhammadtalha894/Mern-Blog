import { BiLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Comment = ({ comment }) => {
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
        <p className='text-sm mb-4 '>{comment.content}</p>
        <div className='flex items-center gap-3 p-3 border-t dark:border-gray-600 w-44 text-sm text-gray-500'>
          <BiLike className='w-5 h-5 cursor-pointer' />
          {comment.numOfLikes === 0 && (
            <span>{comment.numOfLikes || 1} like</span>
          )}
          <Link className='hover:text-cyan-500'>Edit</Link>
          <span className='cursor-pointer hover:text-red-600'>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
