import { useState } from 'react';
import { connect } from 'react-redux';
import Text from '../Text/Text';
import { uploadImage } from '../../../ducks/UploadImage/actions';
import './UploadFile.scss';

function UploadFile({ error, uploadImage }) {

  const [fileName, setFileName] = useState('');

    const handleUpload = (event) => {
      setFileName(event.target.files[0].name);
      const imageFile = event.target.files[0];
      uploadImage(imageFile);
    }   
    
  return (
    <div>
      <div className='upload'>
        <Text className='file-name' size='small'>{fileName ? fileName: 'No image uploaded'}</Text>
        <label className='upload-btn'>
          Upload image
          <input type='file' onChange={handleUpload} />
        </label>
      </div>
      {error && <Text className='error'>{error.message}</Text>}
    </div>
    );
  };
  
  const mapStateToProps = (state) => ({
    error: state.upload.error,
  });
  
  export default connect(mapStateToProps, { uploadImage })(UploadFile);
