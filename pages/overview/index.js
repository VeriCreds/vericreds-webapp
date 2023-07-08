import Head from 'next/head'
import {Allan, Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEvmNativeBalance } from '@moralisweb3/next';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import AllDocuments from '../../components/AllDocuments';
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

function Home({ user }) {
  const address = process.env.NEXT_PUBLIC_WALLET_ADDRESS;
  const { data } = useEvmNativeBalance({ address });

  return (
    <>
      <Head>
        <title>VeriCreds | Overview</title>
        <meta name="description" content="VeriCreds app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div>
        <h3>Wallet: {address}</h3>
        <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
      </div> */}
      
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
        destination: '/signin',
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
