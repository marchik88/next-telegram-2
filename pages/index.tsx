import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from "next/image";

function LoadingPlaceholder() {
  return (
    <div>
      <div>Loading...</div>
    </div>
  );
}

export default function IndexPage() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  if (loading) {
    return <LoadingPlaceholder />;
  }

  const isLoggedIn = !!session?.user;

  return (
    <div>
      {loading ? null : (
        <>
          {session?.user?.image ? (
            <Image
              objectFit="contain"
              src={session?.user?.image}
              alt=""
            />
          ) : null}
          <div>
            <div>
              <h2>Hello</h2>

              <p>
                {session?.user ? (
                  <>
                    <p>You are signed in as</p>&nbsp;
                    <p>{session.user.name}</p>
                  </>
                ) : (
                  <p>You are not signed in</p>
                )}
              </p>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (isLoggedIn) {
                    router.push('/api/auth/signout');
                    signOut();
                  } else {
                    router.push('/api/auth/signin');
                    signIn();
                  }
                }}
              >
                {isLoggedIn ? 'Sign out' : 'Sign in'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}