'use client';
import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/appDetails';
import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

Font.register({
  family: 'var(--font-oswald)',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  document: {
    // display: 'flex',
    flexDirection: 'column',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  h1: {
    fontSize: 56,
    fontFamily: 'var(--font-oswald)',
    marginBottom: 24,
  },
  h2: {
    fontSize: 24,
    marginBottom: 24,
  },
  h3: {
    fontSize: 20,
    marginBottom: 16,
  },
  h4: {
    fontSize: 18,
    textDecoration: 'underline',
    marginBottom: 16,
  },
  p: {
    fontSize: 16,
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  italic: {
    fontStyle: 'italic',
    marginBottom: 16,
  },
  newLine: {
    height: '1rem',
  },
});

const markdownMap = {
  '#### ': { style: styles.h4, substring: 5 },
  '### ': { style: styles.h3, substring: 4 },
  '## ': { style: styles.h2, substring: 3 },
  '# ': { style: styles.h1, substring: 2 },
};

const markdownToJSX = (markdown) => {
  const lines = markdown.split('\n');
  let jsxContent = [];

  lines.forEach((line, index) => {
    let handled = false;

    for (const key in markdownMap) {
      if (line.startsWith(key)) {
        const { style, substring } = markdownMap[key];
        jsxContent.push(
          <Text key={index} style={style}>
            {line.substring(substring)}
          </Text>
        );
        handled = true;
        break;
      }
    }

    if (!handled) {
      if (line.trim() === '') {
        jsxContent.push(
          <Text key={index} style={styles.newLine}>
            {' '}
          </Text>
        );
      } else {
        let segments = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        let formattedLine = segments.map((segment, segmentIndex) => {
          if (segment.startsWith('**')) {
            return (
              <Text key={segmentIndex} style={styles.bold}>
                {segment.slice(2, -2)}
              </Text>
            );
          } else if (segment.startsWith('*')) {
            return (
              <Text key={segmentIndex} style={styles.italic}>
                {segment.slice(1, -1)}
              </Text>
            );
          } else {
            return segment;
          }
        });
        jsxContent.push(
          <Text key={index} style={styles.p}>
            {formattedLine}
          </Text>
        );
      }
    }
  });

  return jsxContent;
};

export default function PDFdownload() {
  const { file } = useContext(AppContext);
  const markdownString = file.template;
  const jsxContent = markdownToJSX(markdownString);

  const MyDocument = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>{jsxContent}</View>
      </Page>
    </Document>
  );

  const filename = file?.pdf?.name?.split('.')[0] || '';

  return (
    <>
      <div className='flex flex-row justify-end items-center gap-4'>
        <p className='text-gray-500'>Download your generated document:</p>
        <PDFDownloadLink
          document={<MyDocument />}
          fileName={`DocInspector_${filename}.pdf`}
          className='self-end'
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              'Loading document...'
            ) : (
              <Button variant='outlined' startIcon={<CloudDownloadIcon />}>
                Download PDF
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
      <MyDocument />
    </>
  );
};
