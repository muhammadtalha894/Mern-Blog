import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Want to run your business digitally?</h2>
        <p className='text-gray-500 my-2'>Checkout Alpha FreeLance</p>
        <Button
          gradientDuoTone='purpleToPink'
          className='rounded-tl-xl rounded-bl-none'
        >
          <a
            href='https://alphafreelance.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            100% satisfied clients
          </a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://scontent.fkhi22-1.fna.fbcdn.net/v/t39.30808-6/431487679_122109967430238748_3489684039569253785_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5bghAvmV-m4Q7kNvgE58qQu&_nc_oc=Adj7OECztuALgHFEKAE0qBxbEjGudwwQXvNQDWHVHwtroNE65Rx5_Z3v6DIE7xegwYI&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfCKkT2ad7uXl8UD8PjRIwMKEHM3Jwp1WrPfzxzdAcEhuw&oe=66387D45' />
      </div>
    </div>
  );
};

export default CallToAction;
