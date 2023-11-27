'use client';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';
import { motion } from 'framer-motion';
import CreateAssistant from './CreateAssistant';
import FileUpload from './FileUpload';

export default function Tutorial() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const { assistant, thread, file, uploaded } = useContext(AppContext);
  return (
    <motion.div
      className='flex flex-col items-center sm:w-[80%] md:w-[75%] mx-auto border border-1 border-gray-200 rounded-md p-10 sm:p-14 bg-white gap-8'
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      {!assistant.assistant && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-4xl font-bold text-center mb-8'>
            Welcome to Doc Inspector!
          </h2>
          <p className='text-xl mb-4'>
            Doc Inspector is a tool that allows you to create an AI assistant
            that can answer questions about a document. The assistant can also generate
            a document for you to download.
          </p>
          <p className='text-xl mb-4'>
            To get started, click the button below to create an assistant.
          </p>
        </motion.div>
      )}
      {assistant.assistant && !thread.thread && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-4xl font-bold text-center mb-8'>
            Create a thread
          </h2>
          <p className='text-xl mb-4'>
            A thread is a conversation between a human and an assistant. To
            create a thread, click <strong>Create Thread</strong> below.
          </p>
        </motion.div>
      )}
      {assistant.assistant && thread.thread && !uploaded.pdf && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-4xl font-bold text-center mb-8'>
            Upload a PDF document
          </h2>
          <p className='text-xl mb-4'>
            To upload a PDF document, click <strong>Upload PDF</strong> below.
          </p>
        </motion.div>
      )}
      {assistant.assistant && thread.thread && uploaded.pdf && !uploaded.md && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-4xl font-bold text-center mb-8'>
            Upload a Markdown template
          </h2>
          <p className='text-xl mb-4'>
            To upload a Markdown template, click{' '}
            <strong>Upload Markdown</strong> below.
          </p>
        </motion.div>
      )}
      {assistant.assistant && thread.thread && uploaded.pdf && uploaded.md && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-4xl font-bold text-center mb-8'>
            Start a conversation
          </h2>
          <p className='text-xl mb-4'>
            To start a conversation with your assistant, type a question in the
            box below and click <strong>Send</strong>.
          </p>
        </motion.div>
      )}
      {!thread.thread && <CreateAssistant />}
      {assistant.assistant && thread.thread && !uploaded.md && (
        <div classname='p-10'>
          {!uploaded.pdf && <FileUpload type='pdf' key='pdf' />}
          {uploaded.pdf && !uploaded.md && <FileUpload type='md' key='md' />}
        </div>
      )}
    </motion.div>
  );
}
