import { Button } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';

export default function StartOver() {
  const { setAssistant, setThread, setFile, setUploaded } =
    useContext(AppContext);

  const handleStartOver = () => {
    setAssistant({});
    setThread({});
    setFile({
      pdf: '',
      md: '',
      template: '',
      uploaded: {
        pdf: false,
        md: false,
      }
    });
    setUploaded({ pdf: false, md: false });
  };

  return <Button onClick={handleStartOver} variant='outlined' className='fixed top-0 right-0 m-4 bg-white hover:bg-blue-50'>Start Over</Button>;
}