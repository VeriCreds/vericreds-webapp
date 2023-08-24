import Head from 'next/head';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import AllDocuments from '../../components/AllDocuments';
import { getSession } from "next-auth/react";
import axios from "axios";

const inter = Inter({ subsets: ['latin'] });

function Home({ user }) {

  const connectBackend = async () => {
    // check if user is new, if they will need to add to database
    try {
    // get token every time
    await axios.post(`process.env.NEXT_PUBLIC_BASE_URL/users/login`, {
      password: process.env.NEXT_PUBLIC_USER_PASSWORD,
      metamask_address: user.metamask_address
    })
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    } catch (e) {
      await axios.post('process.env.NEXT_PUBLIC_BASE_URL/users', {
        first_name: "",
        last_name: "",
        metamask_address: user.metamask_address,
        password: process.env.NEXT_PUBLIC_USER_PASSWORD,
        email_address: ""
      })
    }
  }

  connectBackend()
  
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
          {/* Conditionally render the sidebar */}
          <div className="sidebar w-64 bg-gray-100 flex-shrink-0 hidden lg:block">
            <Sidebar />
          </div>
          <div className="content flex-grow bg-white">
            <AllDocuments user={user} />
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
  };
}

export default Home;
