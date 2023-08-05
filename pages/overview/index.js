import Head from 'next/head'
import {Inter} from 'next/font/google'
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import AllDocuments from '../../components/AllDocuments';
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

function Home({ user }) {
  return (
    <>
      <Head>
        <title>VeriCreds | Overview</title>
        <meta name="description" content="VeriCreds app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col h-screen">
        <div className="topbar bg-gray-200 top-0">
          <Topbar />
        </div>
        <div className="flex flex-grow">
          <div className="sidebar w-64 bg-gray-100 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="content flex-grow bg-white">
            <AllDocuments
              user={user}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user
    }
  }
}

export default Home;
