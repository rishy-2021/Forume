import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { ForuMe } from "./stack/forume";

export interface User {
  name: string;
  email: string;
  image: string;
};

export interface Props {
  user:User
}

const Home: NextPage<Props> = ({user}) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ForuMe {...user} />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        user: null,
      },
    };
  } else {
    return {
      props: {
        user: session?.user,
      },
    };
  }
}

export default Home;
