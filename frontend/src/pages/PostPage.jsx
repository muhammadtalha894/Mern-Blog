import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Button, Spinner } from 'flowbite-react';
import CommentSection from '../components/CommentSection';
import Post from '../components/Post';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(true);
  const [post, setPost] = useState(null);
  const [recPost, setRecPost] = useState([]);

  useEffect(() => {
    const fetchPostRecPost = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/v1/post/getposts?limit=3`);
        const data = await res.json();

        if (res.ok) {
          setloading(false);

          setRecPost(data.posts);
          setError(false);
        }
        if (!data.success) {
          setloading(false);
          setError(false);
        }
      } catch (error) {
        setloading(false);
        setError(true);
      }
    };
    fetchPostRecPost();

    const fetchPostBySlug = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/v1/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (res.ok) {
          setloading(false);
          setPost(data.posts[0]);
          setError(false);
        }
        if (!data.success) {
          setloading(false);
          setError(false);
        }
      } catch (error) {
        setloading(false);
        setError(true);
      }
    };

    fetchPostBySlug();
  }, [postSlug]);

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <Spinner size='xl' aria-label='Default status example' />
        </div>
      ) : (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
          <h1 className='text-3xl mt-10 p-3 text-center font-serif mx-auto max-w-2xl lg:text-4xl'>
            {post && post.title}
          </h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className='self-center mt-5'
          >
            <Button size='xs' pill color='gray' className='p-1'>
              {post && post.category}
            </Button>
          </Link>
          <img
            src={post && post.image}
            alt={post && post.title}
            className='mt-10 p-3 max-h-[600px] object-cover w-full'
          />
          <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <div className='italic'>
              <span
                dangerouslySetInnerHTML={{
                  __html: post && (post.content.length / 1000).toFixed(0),
                }}
              ></span>
              <span className='ml-1'>mins read</span>
            </div>
          </div>
          <div
            className='p-3 w-full mx-auto max-w-2xl post-content overflow-auto'
            dangerouslySetInnerHTML={{
              __html: post && post.content,
            }}
          ></div>
          <CommentSection post={post && post} />

          {recPost.length > 0 && (
            <div className='mb-5 flex flex-col items-center justify-center'>
              <h1 className='text-xl mt-5 mb-5'>Recently Articles</h1>

              <div className='flex flex-col justify-center flex-wrap gap-5 sm:flex-row'>
                {recPost.map((post) => (
                  <Post post={post} />
                ))}
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default PostPage;
