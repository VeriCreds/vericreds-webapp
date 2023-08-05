import React, {useState} from "react";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import VerifyModal from "@/components/modals/VerifyModal";

const Nft = () => {
    const nftAttributes = useSelector((state) => state.nft.value);
    const [showVerifyModal, setShowVerifyModal] = useState(false);

    return (
        <>
            <Head>
                <title>VeriCreds</title>
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
                    <div className="content flex-grow bg-white p-5">
                        <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded-t-lg" src={nftAttributes.image} alt="" />
                            <div className="p-5">
                                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    NFT Details</h1>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div>
                                    <h2 className="font-normal text-gray-700 dark:text-gray-400">
                                        Name: {nftAttributes.name}
                                    </h2>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        Format: {nftAttributes.format}
                                    </p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        Status: {nftAttributes.status}
                                    </p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        Category: {nftAttributes.category}
                                    </p>

                                  </div>
                                  {
                                    nftAttributes.status !== "verified" &&
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' style={{alignSelf: 'end'}}onClick={() => setShowVerifyModal(true)}>Verify</button>
                                  }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
              showVerifyModal &&
              <VerifyModal
                  documentName = {nftAttributes.name}
                  cancelHandler={() => setShowVerifyModal(false)}/>
            }
        </>
    );
};

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

export default Nft;

