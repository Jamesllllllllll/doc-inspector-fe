'use client';
import { useState, createContext, useMemo } from 'react';

const AppContext = createContext();

const ContextProvider = (props) => {

  const [assistant, setAssistant] = useState({});
  const [thread, setThread] = useState({});
  const [uploaded, setUploaded] = useState({ pdf: false, md: false });
  const [hideTutorial, setHideTutorial] = useState(false);
  const [file, setFile] = useState({
    pdf: '',
    md: '',
    template: '',
    uploaded: {
      pdf: false,
      md: false,
    },
  });

  const value = useMemo(
    () => ({
      file,
      setFile,
      assistant,
      setAssistant,
      thread,
      setThread,
      uploaded,
      setUploaded,
      hideTutorial,
      setHideTutorial,
    }),
    [file, assistant, thread, uploaded, hideTutorial]
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
