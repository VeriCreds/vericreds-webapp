import Head from 'next/head'
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { getSession } from "next-auth/react";
import Image from 'next/image';

const About = () => {
    return (
        <div>
            <Head>
                <title>VeriCreds | About</title>
                <meta name="description" content="Learn more about VeriCreds, your trusted partner for secure and immutable document storage on the blockchain." />
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
                    <div className="content flex-grow bg-white p-10">
                        <h1 className="text-4xl font-bold mb-6">About VeriCreds</h1>
                        <Image
                            src="/logo.png"
                            alt="VeriCreds Image"
                            width={100}
                            height={100}
                        />
                        <p className="mt-6 mb-6 text-lg">Welcome to VeriCreds, your trusted partner for secure and immutable document storage on the blockchain.</p>
                        <div className="bg-gray-50 p-6 rounded-md shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                            <p className="mb-6 text-lg">Our mission at VeriCreds is to leverage the power of blockchain technology to provide unparalleled security and authenticity for your most important documents. We aim to revolutionize the way individuals and organizations manage and share their credentials, transcripts, and other critical documents.</p>
                        </div>
                        <div className="mt-6 bg-gray-50 p-6 rounded-md shadow-md">
                            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                            <p className="mb-6 text-lg">Our innovative platform serves as a digital vault for your essential documents. Unlike conventional online storage systems, VeriCreds harnesses the immutability and decentralization of blockchain technology. Once a document is stored on our platform, it is permanently etched onto the blockchain, providing an unalterable record that guarantees its authenticity.</p>
                        </div>
                        <div className="mt-6 bg-gray-50 p-6 rounded-md shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Security & Trust</h2>
                            <p className="mb-6 text-lg">At VeriCreds, we take your security seriously. By leveraging the principles of cryptography inherent in blockchain technology, we ensure that your documents are safe from unauthorized access or tampering. Your records are not only secure but also verifiable against the original entry on the blockchain, bringing an unparalleled level of trust and reliability to digital document storage.</p>
                        </div>
                        <div className="mt-6 bg-gray-50 p-6 rounded-md shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Transparency & Accessibility</h2>
                            <p className="mb-6 text-lg">In addition to security, we believe in the power of transparency and accessibility. Our intuitive platform makes it easy to store, access, and share your important documents from anywhere at any time. At the same time, the transparent nature of blockchain provides a clear trail of any authorized changes made to your documents.</p>
                        </div>
                        <div className="mt-6 bg-blue-50 p-6 rounded-md shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
                            <p className="mb-4 text-lg">Join VeriCreds today and be part of the revolution in secure document storage. Together, we can build a safer, more trustworthy digital space where your important documents are protected and preserved.</p>
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Sign up now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

export default About;
