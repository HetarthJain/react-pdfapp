
// eslint-disable-next-line
import { pdf, Page, Document, Text } from '@react-pdf/renderer';
import { expose } from 'comlink';
// eslint-disable-next-line
import { createElement } from 'react';


/* Prevent live reload problems during development 
* as seen in the reference code */
if (process.env.NODE_ENV !== 'production') {
  global.$RefreshReg$ = () => { };
  global.$RefreshSig$ = () => () => { };
}
let progressCb = console.info;


// Worker function to generate PDF Blob
const generatePDF = async () => {
  progressCb({ progress: 1, current: 0,  });

  let doc;
  try {
    // NOT WORKING
    const  PdfDocument  = require('./PdfDocument'); // JSX component
    doc = createElement(PdfDocument);
    // -------------------------------------------------------------------
    // WORKING
    // doc = createElement(Document, {className:"docu"},
    //   createElement(Page,{className:"pagea"},
    //     createElement(Text,{className:"texts"},"Welcome to wrokers")
    //   )
    // )
  } catch (error) {
    console.log("error is-",error);
  }
  console.log("docs-", doc);
  const pdfBuilder = pdf(doc);
  const pdfBlob = await pdfBuilder.toBlob();
  console.log("blob-", pdfBlob);

  return pdfBlob;
};
const onProgress = cb => (progressCb = cb);

// Expose the generatePDF function to the main thread via Comlink
expose({ generatePDF, onProgress });