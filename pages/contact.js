import Head from 'next/head'
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { getSession } from "next-auth/react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const recaptchaRef = useRef();
    const [inputs, setInputs] = useState({email: "", subject: "", message: ""});
    const [loading, setLoading] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleOnChange = (event) => {
        event.persist();
        setInputs(prev => ({
            ...prev,
            [event.target.id]: event.target.value,
        }));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await axios({
                method: "POST",
                url: "https://formbold.com/s/3Z2q3",
                data: { ...inputs, 'g-recaptcha-response': recaptchaRef.current.getValue() },
            })
            toast.success("Message sent successfully!");
        } catch (error) {
            toast.error("An error occurred while sending the message!");
        } finally {
            setLoading(false);
        }
    };



    // Create an event handler, so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('submit');
        // Do whatever you want with the token
    }, [executeRecaptcha]);

    // You can use useEffect to trigger the verification as soon as the component being loaded
    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);


    return (
        <>
            <Head>
                <title>VeriCreds | Contact</title>
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
                    <div className="content flex-grow bg-white p-6">
                        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                        <form onSubmit={handleOnSubmit} className="space-y-4">
                            <input
                                onChange={handleOnChange}
                                value={inputs.email}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                required
                            />
                            <input
                                onChange={handleOnChange}
                                value={inputs.subject}
                                id="subject"
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                required
                            />
                            <textarea
                                onChange={handleOnChange}
                                value={inputs.message}
                                id="message"
                                name="message"
                                placeholder="Type your message"
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                required
                            />
                                <button
                                  onClick={handleReCaptchaVerify}
                                  type="submit"
                                  disabled={loading}
                                  className={`py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    Send Message
                                </button>

                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} />
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

export default Contact;
