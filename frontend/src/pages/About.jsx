import React from 'react';
import CallToAction from './CallToAction';

const About = () => {
  return (
    <>
      {' '}
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-2xl mx-auto p-3 text-center'>
          <div>
            <h1 className='text-3xl font font-semibold text-center my-7'>
              About Talha' Blog
            </h1>
            <div className='text-md text-gray-500 flex flex-col gap-6'>
              <p>
                Welcome to Talha's Blog! This blog was created by Talha as a
                personal project to share his thoughts and ideas with the world.
                Talha is a passionate developer who loves to write about
                technology, coding, and everything in between.
              </p>

              <p>
                On this blog, you'll find weekly articles and tutorials on
                topics such as web development, software engineering, and
                programming languages. Talha is always learning and exploring
                new technologies, so be sure to check back often for new
                content!
              </p>

              <p>
                We encourage you to leave comments on our posts and engage with
                other readers. You can like other people's comments and reply to
                them as well. We believe that a community of learners can help
                each other grow and improve.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='p-4'>
        <CallToAction />
      </div>
    </>
  );
};

export default About;
