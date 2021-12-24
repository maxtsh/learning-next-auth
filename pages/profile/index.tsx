import { getSession, SessionContextValue } from "next-auth/react";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

interface Props {
  session: SessionContextValue;
}

const Profile: NextPage<Props> = ({ session }) => {
  console.log(session);

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

// This is server side authentication check and we **MUST** =>
// always use getServerSideProps to check always on each request if user is authenticated
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  // Session below will be null if user is not authenticated
  const session = await getSession({ req: context.req });
  console.log(session);
  // If not authenticated then go back to login for example or /
  if (!session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: { session },
  };
};

export default Profile;
