import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';
const CommentSection = ({ post }) => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [commentError, setCommentError] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleOnUpdatedComment = (id, comment) => {
    setComments(
      comments.map((com) => {
        return com._id === id ? { ...com, content: comment.content } : com;
      }),
    );
  };
  const handleOnCommentDelete = async (id, commentUserId) => {
    try {
      const res = await fetch(`/api/v1/comment/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postUserId: post.userId,
          commentId: id,
          commentUserId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments((prev) => prev.filter((com) => com._id !== id));
      }
      if (!res.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCommnets = async () => {
      try {
        const res = await fetch(`/api/v1/comment/getpostcomments/${post._id}`);

        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCommnets();

    return () => {};
  }, []);

  const handleOnCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) return;
    if (comment.length < 1) return setCommentError('Comment is required! ');

    try {
      const res = await fetch('/api/v1/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          content: comment,
          postId: post._id,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment('');
        setComments([...comments, data.newComment]);

        setCommentError(null);
      }
      if (!res.ok) {
        setComment('');
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleOnLike = async (id) => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }
    try {
      const res = await fetch(`/api/v1/comment/likecomment/${id}`);

      const data = await res.json();

      if (res.ok) {
        setComments(
          comments.map((com) => {
            return com._id === id
              ? {
                  ...com,
                  likes: data.comment.likes,
                  numOfLikes: data.comment.numOfLikes,
                }
              : com;
          }),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className=' mx-auto w-full max-w-2xl'>
        {currentUser ? (
          <div className='flex  items-center gap-1 my-5 text-gray-500 text-sm '>
            <p
              className='text-gray-500'
              onClick={() => handleOnLike('662f934d0642e668449796c6')}
            >
              Signed in as:
            </p>
            <img
              src={currentUser.photo}
              alt={currentUser.username}
              className='w-6 h-6 object-cover rounded-full'
            />
            <Link
              to={'/dashboard?tab=profile'}
              className='text-cyan-600 text-xs  hover:underline'
            >
              @{currentUser.username}
            </Link>
          </div>
        ) : (
          <div className='flex gap-1 text-sm text-teal-500 my-5'>
            You must be Signed in to comment.
            <Link className='text-cyan-800 hover:underline' to={'/sign-in'}>
              Sign in
            </Link>{' '}
          </div>
        )}
        {currentUser && (
          <>
            <form
              onSubmit={handleOnCommentSubmit}
              className='border border-gray-400 p-4 rounded-lg'
            >
              <Textarea
                placeholder='add a comment...'
                rows='3'
                maxLength={'200'}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setCommentError(null);
                }}
              />
              <div className='flex justify-between mt-5 text-xs text-gray-500'>
                <span>{200 - comment.length} characters remaining</span>
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                  Submit
                </Button>
              </div>
              {commentError && (
                <Alert className='mt-5' color='failure'>
                  {commentError}
                </Alert>
              )}
            </form>
            {comments.length === 0 ? (
              <p className='text-sm my-5'>No comments yet</p>
            ) : (
              <>
                <div className='flex items-center gap-2 text-sm font-semibold mt-6'>
                  <p>Comments</p>
                  <div>
                    <p className='border rounded-sm border-gray-500 px-2'>
                      {comments.length}
                    </p>
                  </div>
                </div>

                {comments.map((com) => (
                  <Comment
                    key={com._id}
                    comment={com}
                    handleOnCommentDelete={handleOnCommentDelete}
                    handleOnLike={handleOnLike}
                    handleOnUpdatedComment={handleOnUpdatedComment}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CommentSection;
