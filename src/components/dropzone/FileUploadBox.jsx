import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";

const FileUploadBox = ({ name, label, onChange, errors }) => {
  const [file, setFile] = useState(null);

  // Update parent form whenever file changes
  useEffect(() => {
    onChange(file ? [file] : []);
  }, [file, onChange]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const selectedFile = Object.assign(acceptedFiles[0], {
      preview: URL.createObjectURL(acceptedFiles[0]),
    });
    setFile(selectedFile);
    toast.success("File uploaded successfully");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // only allow one file
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    const selectedFile = Object.assign(selectedFiles[0], {
      preview: URL.createObjectURL(selectedFiles[0]),
    });
    setFile(selectedFile);
    toast.success("File uploaded successfully");
  };

  // Cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <>
      <label className="form-label ">{label}</label>
      <div className="text-center">
        <div
          {...getRootProps()}
          className={`drag-area ${
            isDragActive ? "active" : ""
          } upload-box mb-12 position-relative`}
          style={{ minHeight: 150 }}
        >
          <div className="p-30">
            <input
              {...getInputProps()}
              type="file"
              onChange={handleFileSelect}
              accept=".jpg, .jpeg, .png, .webp"
              hidden
            />
          </div>
          {file ? (
            <div
              className="uploaded-preview d-flex align-items-center justify-content-center position-relative gap-4"
              // style={{ width: 140, height: 100 }}
            >
              <img
                src={file.preview}
                alt={file.name}
                className="img-thumbnail position-relative"
                style={{ width: 140, height: 100, objectFit: "cover" }}
              />
              <button
                type="button"
                className="btn btn-link p-0 fs-5"
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering dropzone click
                  setFile(null);
                }}
                style={{ filter: "none" }}
              >
                <TbTrash className="text-danger" />
              </button>
            </div>
          ) : (
            <div className="upload-content">
              <img
                src="/assets/images/file-upload.svg"
                alt="Upload"
                className="upload-icon mb-2"
              />
              <p>
                Drag & drop a file here or{" "}
                <span className="choose-files">Choose file</span> to upload
              </p>
              <span className="support small">
                Supported formats: .jpg, .jpeg, .png, .webp
              </span>
              {errors[name] && (
                <p className="error mt-1">{errors[name].message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploadBox;
