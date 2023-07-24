import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return (
      <div style={{ backgroundColor: '#8B8C89' }} className="sidebar min-h-screen p-4 h-full">
        <div className="logo-part flex flex-col items-center mt-5">
          <Link href="/" className="text-white text-lg mb-5">VeriCreds</Link>
          <Link href="/overview">
            <img
              src="/logo.png"
              alt="VeriCreds Logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <ul className="ml-8 mt-8">
          <li className="mb-4 flex items-center">
            {/*<Image*/}
            {/*  src="/sidebar-all.png"*/}
            {/*  alt="Logo 1"*/}
            {/*  width={20}*/}
            {/*  height={20}*/}
            {/*  className="mr-2"*/}
            {/*/>*/}
            <div className="pr-2">
              <svg color={"#FFFFFF"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <Link href="/overview" className="text-white hover:text-black">All Docs</Link>
          </li>
          <li className="mb-4 flex items-center">
            {/*<Image*/}
            {/*  src="/sidebar-shared.png"*/}
            {/*  alt="Logo 2"*/}
            {/*  width={20}*/}
            {/*  height={20}*/}
            {/*  className="mr-2"*/}
            {/*/>*/}
            <div className="pr-2">
              <svg color={"#FFFFFF"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
              </svg>
            </div>
            <Link href="/about" className="text-white hover:text-black">About</Link>
          </li>
          <li className="mb-4 flex items-center">
            {/*<Image*/}
            {/*  src="/sidebar-verified.png"*/}
            {/*  alt="Logo 3"*/}
            {/*  width={20}*/}
            {/*  height={20}*/}
            {/*  className="mr-2"*/}
            {/*/>*/}
            <div className="pr-2">
              <svg color={"#FFFFFF"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <Link href="/contact" className="text-white hover:text-black">Contact Us</Link>
          </li>

        </ul>
      </div>
    );
  }

  export default Sidebar;