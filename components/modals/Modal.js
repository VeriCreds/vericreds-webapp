import { useState, useEffect } from "react";

const Modal = (props) => {
  const [files, setFiles] = useState([]);

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-2">Upload Document</h2>
        <DragDropFile files={files} setFiles={setFiles} />
        {
          files.map((file) => {
            return (
              <div key={file.lastModified}>{file.name}</div>
            )
          })
        }
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Upload</button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full"
            onClick={props.cancelHandler}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const DragDropFile = (props) => {
  const [dragActive, setDragActive] = useState(false);
  const {files, setFiles} = props;

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
      const filesCopy = files.slice();
      filesCopy.push(e.dataTransfer.files[0]);
      setFiles(filesCopy);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const filesCopy = files.slice();
      filesCopy.push(e.target.files[0]);
      setFiles(filesCopy);
    }
  };

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
        <div>
          <p>Drag and Drop Files Here</p>
        </div> 
      </label>
      {
        dragActive &&
        <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>
      }
    </form>
  );
};

export default Modal;