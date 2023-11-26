'use client';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';

export default function Tutorial() {
  const { assistant, thread, file, uploaded } = useContext(AppContext);
  return (
    <div className='flex flex-col items-center md:w-[75%] pb-4 mx-auto'>
      <div className='flex flex-col items-center w-full'>
        {!assistant.assistant && (
          <>
            <h1 className='text-4xl font-bold text-center mb-4'>
              Welcome to Doc Inspector!
            </h1>
            <p className='text-xl text-center mb-4'>
              Doc Inspector is a tool that allows you to create an AI assistant
              that can answer questions about a document. The assistant will be
              able to answer questions and then fill out a template based on the
              document.
            </p>
            <p className='text-xl text-center mb-4'>
              To get started, you will need to create an assistant, upload a PDF
              document and a Markdown template.
            </p>
            <p className='text-xl text-center mb-4'>
              To get started, click the button below to create an assistant.
            </p>
          </>
        )}
        {assistant.assistant && !thread.thread && (
          <>
            <h1 className='text-4xl font-bold text-center mb-4'>
              Create a thread
            </h1>
            <p className='text-xl text-center mb-4'>
              A thread is a conversation between a human and an assistant. To
              create a thread, click <strong>Create Thread</strong> below.
            </p>
          </>
        )}
        {assistant.assistant && thread.thread && !uploaded.pdf && (
          <>
            <h1 className='text-4xl font-bold text-center mb-4'>
              Upload a PDF document
            </h1>
            <p className='text-xl text-center mb-4'>
              To upload a PDF document, click <strong>Upload PDF</strong> below.
            </p>
          </>
        )}
        {assistant.assistant && thread.thread && uploaded.pdf && !uploaded.md && (
          <>
            <h1 className='text-4xl font-bold text-center mb-4'>
              Upload a Markdown template
            </h1>
            <p className='text-xl text-center mb-4'>
              To upload a Markdown template, click <strong>Upload Markdown</strong> below.
            </p>
          </>
        )}
        {assistant.assistant && thread.thread && uploaded.pdf && uploaded.md && (
          <>
            <h1 className='text-4xl font-bold text-center mb-4'>
              Start a conversation
            </h1>
            <p className='text-xl text-center mb-4'>
              To start a conversation with your assistant, type a question in the
              box below and click <strong>Send</strong>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
