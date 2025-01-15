import { useRouter } from 'next/router';

const Error = () => {
  const router = useRouter();

  return (
    <div>
      <div>
        Error
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Error;