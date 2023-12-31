'use client';
import { useState, useEffect, useContext, useRef } from 'react';
import { useFetch } from '@gadgetinc/react';
import { AppContext } from '../context/appDetails';
import Message from './Message';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TypingIndicator from './TypingIndicator';
import { motion } from 'framer-motion';

export default function Thread() {
  const { assistant, file, thread, setHideTutorial } = useContext(AppContext);
  const mockMessages = [
    { role: 'user', content: 'Hello from the user' },
    { role: 'assistant', content: 'Hello from the assistant' },
  ];
  const [messages, setMessages] = useState([]);
  const [runExternalId, setRunExternalId] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [input, setInput] = useState('');
  const [runStatus, setRunStatus] = useState('');
  const inputRef = useRef();

  const handleInputChange = (e) => setInput(e.target.value);

  const [{ messageData }, addMessage] = useFetch(
    `/messages/${thread?.thread?.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      json: true,
      sendImmediately: false,
    }
  );

  const [{ runData }, getRunStatus] = useFetch(
    `/openAiRuns?runId=${runExternalId}&threadId=${thread?.thread?.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      sendImmediately: false,
      json: true,
    }
  );

  const [{ threadData }, updateThread] = useFetch(
    `/messages/${thread?.thread?.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      sendImmediately: false,
      json: true,
    }
  );

  const [{ cancelRunData }, cancelRun] = useFetch(
    `/openAiRuns?runId=${runExternalId}&threadId=${thread?.thread?.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      sendImmediately: false,
      json: true,
    }
  );

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const checkRunStatus = async () => {
    let updatedStatus = await getRunStatus();
    let attempts = 0;
    while (
      updatedStatus?.runStatus !== 'completed' &&
      updatedStatus?.runStatus !== 'failed' &&
      attempts < 100
    ) {
      console.log('Checking run status...');
      console.log(updatedStatus);
      setRunStatus(updatedStatus?.runStatus);
      await delay(2000);
      updatedStatus = await getRunStatus();
      attempts++;
    }
    console.log(`Made ${attempts} attempts to check run status`);
    if (updatedStatus?.runStatus === 'completed') {
      console.log('Looking for new messages...');
      try {
        const newThread = await updateThread();
        console.log('New thread');
        console.log(newThread);
        if (newThread?.messages?.body?.data) {
          const newMessages = newThread.messages.body.data.map((item) => ({
            role: item.role,
            content: item.content[0].text.value.replace(/【\d+†source】/g, ''), // .replace will remove citations if they exist
          }));
          console.log('New messages found:');
          console.log(newMessages);
          setMessages(newMessages);
        }
      } catch (error) {
        console.error('Failed to update thread:', error);
      }
    } else {
      console.log(
        `Run did not complete. Run Status: ${updatedStatus?.runStatus}`
      );
    }
    setWaiting(false);
    setRunStatus(updatedStatus?.runStatus);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (runExternalId) {
      checkRunStatus();
    }
    inputRef.current.focus();
  }, [runExternalId, getRunStatus, updateThread]);

  useEffect(() => {
    if (!waiting) {
      inputRef.current.focus();
    }
  }, [waiting]);

  useEffect(() => {
    if (runStatus === 'failed') {
      cancelRun();
    }
  }, [runStatus]);

  const handleSubmit = async (e) => {
    if (!input) return;
    e.preventDefault();
    setHideTutorial(true);
    const newMessage = input;
    setInput('');
    setWaiting(true);
    setMessages([{ role: 'user', content: newMessage }, ...messages]);
    try {
      const response = await addMessage({
        body: JSON.stringify({ message: newMessage }),
      });
      setRunExternalId(response?.run?.externalId);
    } catch (error) {
      console.error(error);
    }
    setInput('');
  };

  return (
    <>
      <motion.div
        className={`flex flex-col-reverse overflow-scroll ${
          messages.length !== 0 ? 'h-96' : 'h-48'
        } sm:w-[80%] md:w-[75%] sm:w-full whitespace-pre-wrap bg-white rounded-lg p-4 border border-gray-300 w-full`}
        layout
      >
        {waiting && <TypingIndicator status={runStatus} />}
        {runStatus === 'failed' && (
          <Message
            role='system'
            content={`Sorry, I couldn't understand your question. Please try again.`}
          />
        )}
        {assistant && file.pdf && file.md && thread ? (
          messages.map((msg, index) => (
            <Message key={index} role={msg.role} content={msg.content} />
          ))
        ) : (
          <p>Upload a PDF document & Markdown file to begin</p>
        )}
        {thread && file.uploaded.pdf && file.uploaded.md ? (
          <Message
            role='system'
            content={`Hi there! What would you like to know about ${file.pdf.name}?`}
          />
        ) : (
          ''
        )}
      </motion.div>
      <form
        role='form'
        onSubmit={handleSubmit}
        className='w-full flex justify-center items-center gap-4'
      >
        <input
          className='w-full max-w-md border border-gray-300 rounded shadow-xl p-2 dark:text-black'
          value={input}
          aria-label='Interact-with-AI'
          disabled={waiting || !assistant || !file.pdf || !file.md || !thread}
          placeholder={
            thread && file.uploaded.pdf && file.uploaded.md
              ? 'Ask a question...'
              : ''
          }
          onChange={handleInputChange}
          ref={inputRef}
        />
        {waiting ? (
          <LoadingButton loading />
        ) : (
          <Button
            component='label'
            variant='contained'
            disabled={waiting || !assistant || !file.pdf || !file.md || !thread}
            onClick={handleSubmit}
          >
            Send
          </Button>
        )}
      </form>
    </>
  );
}
