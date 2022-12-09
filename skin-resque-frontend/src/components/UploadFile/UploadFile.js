import React, { useState } from 'react';
import { Line } from "rc-progress";
import Upload from "rc-upload";
import Button from '../Button/Button';
import Text from '../Text/Text';
import './UploadFile.scss';


function UploadFile() {
    const [imgData, setImgdata] = useState();
    const [fileName, setFileName] = useState();
    const [fileSize, setFileSize] = useState();
    const [percentage, setPercentage] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const props = {
        action: "https://httpbin.org/post",
        accept: ".png, .jpg",
        beforeUpload(file) {
          setIsUploading(true);
          setFileName(file.name);
          setFileSize(Math.floor(file.size / 1000));
          if (file.type === "image/png") {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImgdata(reader.result);
            };
            reader.readAsDataURL(file);
          }
        },
        onSuccess() {
          setIsUploading(false);
        },
        onProgress(step) {
          setPercentage(Math.round(step.percent));
        },
        onError(err) {
          console.log("onError", err);
        }
      };
      

  return (
    <div>
      {fileName && (
        <React.Fragment>
          {imgData && (
            <div>
              <img src={imgData} width="250" />
            </div>
          )}
          <div className="upload-list">
            <Text className="file-name" size='small'>
              <b>{fileName}</b>
            </Text>
            <div className="progress-container">
              <Line
                percent={percentage}
                strokeWidth={9}
                trailWidth={9}
                trailColor="#FFF"
                strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
              />
              <Text className="progress-text" size='small'>
                {isUploading ? `Uploading ${percentage}% ` : `Finished`}
              </Text>
            </div>
            <Text className="file-size" size='small'>{`${fileSize} KB`}</Text>
          </div>
        </React.Fragment>
      )}
      <Upload {...props}>
        <Button>Upload File</Button>
      </Upload>
    </div>
  )
}

export default UploadFile