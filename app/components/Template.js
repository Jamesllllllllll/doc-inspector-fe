'use client';
import Markdown from 'react-markdown';
import { Paper } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';
import './Template.css';


export default function Template() {

  const { file, uploaded } = useContext(AppContext);

  return (
    <>
      {uploaded.md && (
        <>
          <p>Template</p>
          <Paper sx={{ px: 4, py: 2 }}>
            <Markdown>{file.template}</Markdown>
          </Paper>
        </>
      )}
    </>
  );
}
