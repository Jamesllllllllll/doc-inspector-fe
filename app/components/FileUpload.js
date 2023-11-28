'use client';
import { useState, useContext } from 'react';
import { AppContext } from '../context/appDetails';
import { useAction } from '@gadgetinc/react';
import { api } from '../../api';
import { Button, Card } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

export default function FileUpload({ type }) {
  const { file, setFile, assistant, uploaded, setUploaded } =
    useContext(AppContext);
  const [newUpload, setNewUpload] = useState(true);
  const [{ data, error, fetching }, create] = useAction(api.document.create);

  const filetype = `.${type}`;
  const role = type === 'md' ? 'template' : 'resource';

  const handleFileChange = (e) => {
    const singleFile = e.target.files[0];
    if (singleFile) {
      console.log(singleFile);
      setFile((prevFile) => ({ ...prevFile, [type]: singleFile }));
    }
    if (type === 'md') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setFile((prevFile) => ({ ...prevFile, template: e.target.result }));
      };
      reader.readAsText(singleFile);
    }
  };

  const handleUploadClick = async () => {
    if (!file[type]) {
      return;
    }

    try {
      setNewUpload(false);
      console.log(
        `Uploading ${type} file with role ${role} and assistant ${assistant.assistant.id}`
      );
      await create({
        file: { file: file[type] },
        role: role,
        assistant: {
          _link: assistant.assistant.id,
        },
      });
      setFile((prevFile) => ({
        ...prevFile,
        uploaded: { ...prevFile.uploaded, [type]: true },
      }));
      setUploaded((prevUploaded) => ({ ...prevUploaded, [type]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Card sx={{ padding: 3, backgroundColor: '#FCFCFC', flexGrow: 0 }}>
      <div className='flex flex-col gap-4 mb-4 p-4 items-center'>
        <p>Upload a {type === 'pdf' ? 'PDF' : 'Markdown'} file</p>

        {/* Upload button */}
        {!fetching && (
          <Button
            component='label'
            variant='contained'
            startIcon={<CloudUploadIcon />}
          >
            {file[type] === '' ? 'Upload' : 'Change'} file
            <VisuallyHiddenInput
              type='file'
              accept={filetype}
              onChange={handleFileChange}
              onClick={() => {
                // setFile({ ...file, [type]: '' });
                setNewUpload(true);
              }}
            />
          </Button>
        )}

        {/* File name - only show before uploading */}
        {file[type] && !fetching && newUpload === true && (
          <div className='flex flex-row flex-nowrap my-2 py-2 px-4 gap-2 w-full justify-center items-center border rounded-lg text-sm font-medium bg-white text-slate-900 shadow-sm'>
            <p>{file[type].name}</p>{' '}
            {file[type] && !fetching && newUpload === true && (
              <DeleteForeverIcon
                className='cursor-pointer text-red-700 hover:text-red-800'
                onClick={() => {
                  setFile({ ...file, [type]: '' });
                }}
              />
            )}
          </div>
        )}

        {/* Upload button - only show when there is a file to be uploaded */}
        {file[type] ? (
          fetching ? (
            <LoadingButton
              loading
              loadingPosition='start'
              startIcon={<SaveIcon />}
              variant='outlined'
            >
              Uploading
            </LoadingButton>
          ) : (
            newUpload === true && (
              <Button
                component='label'
                variant='contained'
                disabled={file[type] === ''}
                className='bg-green-700 hover:bg-green-800'
                onClick={handleUploadClick}
              >
                Upload
              </Button>
            )
          )
        ) : null}

        {/* Uploaded file name - only show after uploading */}
        {data && !fetching && newUpload === false && (
          <p className='my-2 p-4'>Uploaded: {file[type].name}</p>
        )}
      </div>
    </Card>
  );
}
