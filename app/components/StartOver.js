import { Button } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../context/appDetails';

export default function StartOver() {
  const { setAssistant, setThread, setFile, setUploaded, setHideTutorial } =
    useContext(AppContext);

  const handleStartOver = () => {
    setHideTutorial(false);
    setAssistant({});
    setThread({});
    setFile({
      pdf: '',
      md: '',
      template: '',
      uploaded: {
        pdf: false,
        md: false,
      },
    });
    setUploaded({ pdf: false, md: false });
  };

  const loadState = () => {
    setAssistant({});
    setThread({});
    setFile({
      pdf: '',
      md: '',
      template: '',
      uploaded: {
        pdf: false,
        md: false,
      },
    });
    setUploaded({ pdf: false, md: false });
  };

  return (
    <Button
      onClick={handleStartOver}
      variant='outlined'
      className='bg-white hover:bg-blue-50'
      sx={{ backgroundColor: '#fff', zIndex: 2 }}
    >
      Start Over
    </Button>
  );
}
