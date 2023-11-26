import { Button } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';

export default function StartOver() {
  const { setAssistant, setThread, setFile, setUploaded } =
    useContext(AppContext);

  const handleStartOver = () => {
    setAssistant({});
    setThread({});
    setFile({});
    setUploaded({});
  };

  return <Button onClick={handleStartOver} className='fixed top-0 right-0 m-4'>Start Over</Button>;
}
