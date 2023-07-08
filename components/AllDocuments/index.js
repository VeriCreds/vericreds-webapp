import React, {useState} from 'react';
import {signOut} from "next-auth/react";

// project imports
import TableList from "@/components/AllDocuments/TableList";
import TableGrid from "@/components/AllDocuments/TableGrid";
import Modal from '../modals/Modal';

const AllDocuments = (props) => {

  console.log(props.user);

  const collection = [
    {
      name: 'document1',
      format: 'PDF',
      image:
        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
      status: "verified",
      category: "Identification"
    },
    {
      name: 'document2',
      format: 'PDF',
      image:
        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
      status: "minted",
      category: "Reference Letters"
    },
    {
      name: 'document3',
      format: 'PNG',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
      status: "shared",
      category: "Certificates"
    },
    {
      name: 'document4',
      format: 'PDF',
      image:
        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
      status: "minted",
      category: "Reference Letters"
    },
    {
      name: 'document5',
      format: 'PDF',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
      status: "shared",
      category: "Identification"
    },
    {
      name: 'document6',
      format: 'PDF',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
      status: "verified",
      category: "Others"
    },
    {
      name: 'document7',
      format: 'PDF',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
      status: "minted",
      category: "Certificates"
    },
    {
      name: 'document8',
      format: 'PDF',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
      status: "shared",
      category: "Transcripts"
    },
    {
      name: 'document9',
      format: 'JPEG',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
      status: "minted",
      category: "Reference Letters"
    },
    {
      name: 'document10',
      format: 'PDF',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
      status: "shared",
      category: "Recommendation Letters"
    },
    {
      name: 'Recommendation',
      format: 'PNG',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
      status: "shared",
      category: "Diplomas"
    },
    {
      name: 'Transcript',
      format: 'PDF',
      image:
          'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
      status: "minted",
      category: "Transcripts"
    }
  ]

  // Set state variable for showing grid view
  const [viewMode, setViewMode] = useState('list');

  // State variables for showing modals
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
        <div className="allcollections p-12">
          {/*<button*/}
          {/*  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
          {/*  onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>*/}

          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => signOut({ redirect: "/signin" })}>
              Sign out
            </button>
            <div className="flex justify-end">
              <div className="mr-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-full flex items-center justify-center" onClick={() => setShowUploadModal(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Upload
                </button>
              </div>
              <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
                <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-4 py-2 ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} id="list">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4 mr-2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  <span>List</span>
                </button>
                <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} id="grid">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4 mr-2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                <span>Grid</span>
                </button>
              </div>
            </div>
          </div>

        {/*<h4>User session:</h4>*/}
        {/*<pre>{JSON.stringify(props.user, null, 2)}</pre>*/}
        {viewMode === "list" && <>
          {/*<ul className="divide-y divide-gray-200">*/}
          {/*  {collection.map((document) => (*/}
          {/*      <>*/}
          {/*        <li key={document.name} className="py-4 flex hover:bg-gray-100">*/}
          {/*          <img className="h-20 w-20" src={document.image} alt="" />*/}
          {/*          <div className="ml-3">*/}
          {/*            <p className="text-sm font-medium text-gray-900">{document.name}</p>*/}
          {/*            <p className="text-sm text-gray-500">{document.format}</p>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*      </>*/}
          {/*  ))}*/}
          {/*</ul>*/}
          <TableList
            // viewMode={viewMode}
            collection={collection}
          />
        </>
        }
        {viewMode === "grid" && <>
        {/*<ul className="grid grid-cols-4 gap-4">*/}
        {/*  {collection.map((document) => (*/}
        {/*    <li key={document.name} className="py-4 flex flex-col items-center hover:bg-gray-100">*/}
        {/*      <img className="h-40 w-40" src={document.image} alt="" />*/}
        {/*      <div className="ml-2">*/}
        {/*        <p className="text-sm font-medium text-gray-900">{document.name}</p>*/}
        {/*        <p className="text-sm text-gray-500">{document.format}</p>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
        <TableGrid
            collection={collection}
        />
        </>
        }
      </div>
      {
        showUploadModal &&
        <Modal cancelHandler={() => setShowUploadModal(false)}/>
      }
    </>
  );
}

export default AllDocuments;
