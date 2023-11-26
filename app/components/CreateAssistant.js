'use client';
import { useState, useContext, useEffect } from 'react';
import { useFetch } from '@gadgetinc/react';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { AppContext } from '../contexts/appDetails';

export default function CreateAssistant() {
  const { assistant, setAssistant, thread, setThread, file } =
    useContext(AppContext);
  const [loading, setLoading] = useState({ assistant: false, thread: false });
  const [instructions, setInstructions] = useState(
    `"You are a helpful, friendly assistant.  With the document provided ${
      `with the filename ${file.pdf}` || ''
    }, you will help humans answer their questions about this document. You will not stray from the information in this document. If you do not know the answer, you will say so. If there is a request that is outside the context of this document you will inform the human that you can not answer the question. The only exception to this rule, is that the human may ask you fill in a template ${
      `following the format in the file ${file.pdf}` || ''
    } with some of the information from the document. You will not stray from the format of this template. If you can't find the information for the template, you will leave the area of the template blank.";`
    //`You are a helpful, friendly assistant. With the document provided ${`with the filename ${file.pdf}` || ''}, you will help humans answer their questions about this document. You will not stray from the information in this document. If you do not know the answer, you will say so. If there is a request that is outside the context of this document you will inform the human that you can not answer the question.`
  );

  const [{ asstData, asstError, asstFetching }, addAssistant] = useFetch(
    '/assistants',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      json: true,
    }
  );

  const [{ threadData, threadError, threadFetching }, addThread] = useFetch(
    `/threads/${assistant?.assistant?.id || ''}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: assistant?.assistant?.id,
      }),
      method: 'POST',
      json: true,
    }
  );

  const createAssistant = async () => {
    setLoading({ ...loading, assistant: true });
    try {
      const response = await addAssistant({
        body: JSON.stringify({
          instructions: instructions,
        }),
      });
      console.log(response);
      setAssistant(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({ ...loading, assistant: false });
    }
  };

  const createThread = async () => {
    setLoading({ ...loading, thread: true });
    try {
      const response = await addThread();
      console.log(response);
      setThread(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({ ...loading, thread: false });
    }
  };

  return (
    <>
      <div className='flex flex-col justify-center'>
        {!assistant.assistant ? (
          loading.assistant ? (
            <LoadingButton
              loading
              loadingPosition='start'
              startIcon={<SaveIcon />}
              variant='outlined'
            >
              Creating assistant...
            </LoadingButton>
          ) : (
            <Button variant='outlined' onClick={createAssistant}>
              Create an Assistant
            </Button>
          )
        ) : (
          <p>{`Assistant ${assistant.assistant.id} created.`}</p>
        )}
      </div>
      {assistant.assistant && (
        <div className='flex flex-row gap-4 justify-between items-center'>
          {!thread.thread ? (
            loading.thread ? (
              <LoadingButton
                loading
                loadingPosition='start'
                startIcon={<SaveIcon />}
                variant='outlined'
              >
                Creating thread...
              </LoadingButton>
            ) : (
              <Button variant='outlined' onClick={createThread}>
                Create a thread
              </Button>
            )
          ) : (
            <p>{`Thread ${thread.thread.id} created.`}</p>
          )}
        </div>
      )}
    </>
  );
}
