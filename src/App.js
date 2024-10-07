// import Worker from "worker-loader!./app.worker"
import * as Comlink from 'comlink';
import { saveAs } from 'file-saver';
import { useAsyncCallback } from 'react-async-hook';
import PdfDocument from "./PdfDocument";

const App = () => {

        ///////////////////////////////////////////////
        const DownloadPDFButton = () => {
            // Hook to handle the PDF generation and download
            const downloadAction = useDownloadPDFCallback();
            return (
                <button
                    status={downloadAction.status}
                    onClick={downloadAction.execute}
                    
                >
                    {downloadAction.loading ? 'Downloading...' : "Download using Workers"}
                </button>
            );
        };
    
        // Custom hook to manage the PDF download process
        const useDownloadPDFCallback = () =>
            useAsyncCallback(async () => {
    
                // Initialize the worker
                
                const worker = new Worker('./app.worker.js', { type: 'module' });
                const pdfWorker = Comlink.wrap(worker);
                pdfWorker.onProgress(Comlink.proxy(info => console.log(info)));
    
                // Generate the PDF Blob using the Web Worker
                const pdfBlob = await pdfWorker.generatePDF();
    
    
                // Use the file-saver library to trigger the download
                saveAs(pdfBlob, 'generated_.pdf');
            });
        ///////////////////////////////////////////////////////////////////

        return (
           <>
           <DownloadPDFButton />
           <PdfDocument />
           </>
        );
}

export default App;