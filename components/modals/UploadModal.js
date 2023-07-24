import { useState } from "react";

const UploadModal = (props) => {

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-2">Upload Document</h2>
        <DragDropFile setFileChosen={props.setFileChosen}/>
        <div>
          <span className="pr-1">
            <button
                className={`${props.fileChosen ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' : 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full'} text-${props.fileChosen ? 'white' : 'gray'}-500`}
                style={{ cursor: !props.fileChosen ? 'not-allowed' : "" }}
                disabled={!props.fileChosen}
            >
              Select
            </button>
          </span>
          <span className="pl-1">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full"
              onClick={() => {
                props.cancelHandler();
                props.setFileChosen(false);
              }}>Cancel</button>
          </span>
        </div>
      </div>
    </div>
  );
};

const DragDropFile = (props) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      props.setFileChosen(true);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
      props.setFileChosen(true);
    }
  };

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
        <div>
          <p>Drag and Drop Files Here</p>
          {/*<button className="upload-button">Upload a file</button>*/}
        </div> 
      </label>
      {
        dragActive &&
        <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>
      }
    </form>
  );
};

export default UploadModal;
