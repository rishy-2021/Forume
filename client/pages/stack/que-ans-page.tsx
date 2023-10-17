import { getSession } from "next-auth/react";
import Header from "../../components/header";
import Questionnewpage from "../../components/question-new-page";
import { useRouter } from "next/router";

function QueAnsPage({ user }) {
  const router = useRouter();
  const query = router.query;
  const questionId = query.id;

  return (
    <div className="relative h-screen">
      <Header {...user} />
      <main className="md:flex mt-24 lg:px-10 xl:px-32 2xl:px-28 md:px-14 ">
        <section className="text-gray-500 middle mt-16 gap-8 px-4 text-sm sm:px-16 md:px-8 md:w-[70%] xl:w-[90%]">
          {questionId != undefined && (
            <Questionnewpage
              email={user?.email}
              questionId={questionId}
            />
          )}
        </section>
      </main>
    </div>
  );
}

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

export default QueAnsPage;
