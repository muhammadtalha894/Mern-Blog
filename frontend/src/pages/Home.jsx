import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from './CallToAction';
import Post from '../components/Post';

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const homePostsFetch = async () => {
      try {
        const res = await fetch('/api/v1/post/getposts?limit=9');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    homePostsFetch();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 lg:p-28  max-w-6xl mx-auto p-10 '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my blog</h1>
        <p className='text-gray-500 text-x'>
          Here you will find a variety of articles and tutorials on topics such
          as web development, software engineering, and programming languages.{' '}
        </p>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3'>
        {' '}
        <CallToAction />
      </div>

      {posts && posts.length > 0 && (
        <div className='max-w-6xl mx-auto p-3  flex flex-col gap-8 py-7'>
          <h2 className='font-semibold text-center text-2xl'>Recent Posts</h2>
          <div className='flex flex-wrap justify-center gap-4 '>
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </div>
          <Link
            to={'/search'}
            className='text-sm p-4 sm:text-lg text-teal-500 hover:underline text-center'
          >
            View all posts
          </Link>
        </div>
      )}
    </div>
  );
};
