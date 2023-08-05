import Head from 'next/head'
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { getSession } from "next-auth/react";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = (props) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [token, setToken] = useState('');

    const handleSubmitForm = useCallback((e) => {
          e.preventDefault();

          if (!executeRecaptcha) {
              console.log("Execute recaptcha not yet available");
              return;
          }

          executeRecaptcha("submit").then(async (gReCaptchaToken) => {
              console.log(gReCaptchaToken, "response Google reCaptcha server");
              await submitEnquiryForm(gReCaptchaToken);
              setToken(gReCaptchaToken);
          });
          setLoading(false);
      }, [executeRecaptcha, email, subject, message, token]
    );

    async function submitEnquiryForm(token) {

        await axios.post("/api/contactUs", {
            email: email,
            subject: subject,
            message: message,
            gReCaptchaToken: token,
        }).then(async (res) => {
            console.log(res);
            console.log(res.data);
            await console.log("gReCaptchaToken", token);
            setLoading(true);
            if (res.data.status !== "error") {
                toast.success("Message sent successfully");
                setTimeout(() => {
                    window.location.reload(false);
                }, 5000);
            } else {
                toast.error("An error occurred while sending the message");
                setTimeout(() => {
                    window.location.reload(false);
                }, 5000);
            }
        });
    }

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
                  <section class="bg-white dark:bg-gray-900 w-full">
                      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                          <form
                            onSubmit={handleSubmitForm}
                            className="space-y-8"
                          >
                              <div className={"py-1"}>
                                  <label htmlFor="email"
                                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
                                      email</label>
                                  <input
                                    onChange={(e) => {
                                        setEmail(e?.target?.value)
                                    }}
                                    value={email}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="name@email.com"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    required
                                  />
                              </div>

                              <div className={"py-1"}>
                                  <label htmlFor="subject"
                                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                                  <input
                                    onChange={(e) => {
                                        setSubject(e?.target?.value)
                                    }}
                                    value={subject}
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    placeholder="Let us know how we can help you"
                                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    required
                                  />
                              </div>

                              <div className={"py-1"}>
                                  <label htmlFor="message"
                                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your
                                      message</label>
                                  <textarea
                                    onChange={(e) => {
                                        setMessage(e?.target?.value);
                                    }}
                                    value={message}
                                    id="message"
                                    name="message"
                                    placeholder="Leave a comment"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                  />
                              </div>

                              <button
                                type="submit"
                                disabled={loading}
                                className={`py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                  Send Message
                              </button>
                              {/*{token && <p>Token: {token}</p>}*/}
                          </form>
                      </div>
                  </section>
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

export default Contact;
