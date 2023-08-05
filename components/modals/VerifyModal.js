import { useState } from "react";

const VerifyModal = (props) => {
  
  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-2">Verify Document</h2>
        <p style={{marginBottom: '0.5rem'}}>Are you sure you want to verify {props.documentName}?</p>
        <div>
          <span className="pr-1">
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
            >
              Confirm
            </button>
          </span>
          <span className="pl-1">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full"
              onClick={() => {
                props.cancelHandler();
              }}>Cancel</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
