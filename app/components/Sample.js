import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/appDetails';

export default function Sample({ file }) {
  const { setFile } = useContext(AppContext);
  const sampleFile = file === 'Sample PDF' ? '/Sample_Documentation.pdf' : '/Software_Feature_Template.md';
  const type = file === 'Sample PDF' ? 'pdf' : 'md';
  const [fileObject, setFileObject] = useState(null);
  const fileName = sampleFile.substring(1);
  
  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(sampleFile);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      setFileObject(file);
    };
    fetchFile();
  }, [sampleFile]);

  const handleButtonClick = () => {
    if (fileObject) {
      setFile((prevFile) => ({ ...prevFile, [type]: fileObject }));

      if (type === 'md') {
        const reader = new FileReader();
        reader.onload = async (e) => {
          setFile((prevFile) => ({ ...prevFile, template: e.target.result }));
        };
        reader.readAsText(fileObject);
      }
    }
  };

  return (
    <Button
      onClick={handleButtonClick}
      variant='outlined'
      className='bg-white hover:bg-blue-50'
      sx={{ backgroundColor: '#fff', zIndex: 2, mx: 1 }}
      startIcon={<CloudDownloadIcon />}
    >
      {`Use a sample ${type}`}
    </Button>
  );
}
