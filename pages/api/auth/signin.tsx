import { GetServerSidePropsContext } from 'next';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import { LoginButton, TelegramAuthData } from '@telegram-auth/react';
import { useRouter } from 'next/router';

const Signin = ({
                  providers,
                  csrfToken,
                  botUsername,
                }: {
  providers: Awaited<ReturnType<typeof getProviders>>;
  csrfToken?: string;
  botUsername: string;
}) => {
  const router = useRouter();

  return (
    <div>
      <div>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
        {Object.values(providers || {})?.map((provider) => {
          return (
            <div key={provider.name}>
              {provider.id === 'telegram-login' ? (
                <>
                  <LoginButton
                    botUsername={botUsername}
                    onAuthCallback={(data: TelegramAuthData) => {
                      signIn(provider.id, { callbackUrl: '/' }, data as unknown as Record<string, string>);
                    }}
                  />
                </>
              ) : (
                <>
                  {/* Render other providers */}
                  <button onClick={() => signIn(provider.id)}>Sign in
                    with {provider.name}</button>
                </>
              )}
            </div>
          );
        })}
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}
        >
          Goto home page
        </button>
      </div>
    </div>
  );
};

export default Signin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  const botUsername = 'marchugan_telegram_auth_bot'
  return {
    props: {
      providers,
      csrfToken,
      botUsername,
    },
  };
}