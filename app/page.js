'use client';
import Tutorial from './components/Tutorial';
import CreateAssistant from './components/CreateAssistant';
import FileUpload from './components/FileUpload';
import Thread from './components/Thread';
import PDFdownload from './components/PDFdownload';
import StartOver from './components/StartOver';
import { Paper } from '@mui/material';
import { AppContext } from './contexts/appDetails';
import { useContext } from 'react';

export default function App() {
  const { file, assistant, thread, uploaded } = useContext(AppContext);
  return (
    <>
      <div className='flex flex-row justify-center gap-4'>
        <div className='flex flex-col stretch items-center w-[80%] min-h-screen py-24 gap-4'>
          <Tutorial />
          {!thread.thread && <CreateAssistant />}
          {assistant.assistant && thread.thread && (
            <div classname='p-10'>
              {!uploaded.pdf && <FileUpload type='pdf' key='pdf' />}
              {uploaded.pdf && !uploaded.md && (
                <FileUpload type='md' key='md' />
              )}
            </div>
          )}
          {uploaded.md && <Thread />}
        </div>
      </div>
      {uploaded.md && (
        <div className='flex flex-col items-center md:w-[75%] pb-24 mx-auto'>
          <Paper className='p-4 my-4 w-full flex flex-col'>
            <PDFdownload />
          </Paper>
        </div>
      )}
      {assistant.assistant && <StartOver />}
    </>
  );
}
