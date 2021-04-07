import React, { useState } from "react";
import "./FileUploader.scss";
import uploadButton from "../static-files/imgs/upload.png";
import axios from "axios";
import { Button } from "react-bootstrap";

const FileUploader = () => {
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>();

  const handleChange = (fileObj: FileList | null) => {
    setSuccess(false);
    setUrl("");
    if (fileObj !== null && fileObj.length !== 0) setFile(fileObj[0]);
  };

  const handleUpload = (e: any) => {
    setSuccess(false);
    if (file === undefined || file === null) return;
    // Split the filename to get the name and type
    let fileParts = file.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "/api/v1/s3/sign_s3",
        {
          fileName: fileName,
          fileType: fileType,
        },
        config
      )
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        setUrl(url);

        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            setSuccess(true);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uploadMessage = (): JSX.Element =>
    file === null || file === undefined ? (
      <h5>Choose a file</h5>
    ) : (
      <h5>{file?.name.split("\\").pop()}</h5>
    );

  return (
    <div className="uploader">
      {success && <img className="preview" alt="" src={url} />}
      <div className="selector-items">
        <input
          className="inputfile"
          id="file"
          onChange={(e) => handleChange(e.target.files)}
          type="file"
        />
        <label htmlFor="file">
          <img src={uploadButton} alt="Upload" />
          {uploadMessage()}
        </label>
        <Button id="upload" onClick={handleUpload} variant="secondary">
          <h5>Upload</h5>
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
