'use client';
import Tutorial from './components/Tutorial';
import CreateAssistant from './components/CreateAssistant';
import FileUpload from './components/FileUpload';
import Thread from './components/Thread';
import PDFdownload from './components/PDFdownload';
import StartOver from './components/StartOver';
import { Paper } from '@mui/material';
import { AppContext } from './contexts/appDetails';
import { useContext, useEffect } from 'react';

export default function App() {
  const { file, assistant, thread, uploaded, hideTutorial } =
    useContext(AppContext);

  return (
    <>
      <div class='blurry-filter'>
        <div>Doc Inspector</div>
        {assistant.assistant && <StartOver />}
      </div>

      <div className='flex flex-row justify-center gap-4 w-full'>
        <div className='flex flex-col items-center mx-2 sm:w-[80%] py-24 gap-12'>
          {!hideTutorial && <Tutorial />}
          {uploaded.md && <Thread />}
        </div>
      </div>
      {uploaded.md && (
        <div className='flex flex-col items-center md:w-[75%] pb-24 mx-2'>
          <Paper className='p-4 my-4 w-full flex flex-col'>
            <PDFdownload />
          </Paper>
        </div>
      )}
    </>
  );
}
