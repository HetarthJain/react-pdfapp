// PdfDocument.js
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#E4E4E4' },
    section: { margin: 10, padding: 10, flexGrow: 1 ,color:"blue"}
});


const PdfDocument = () => (
    <Document>
            <Page style={styles.page}>
                <Text style={styles.section}> Hello World this is created using workers!!! </Text>
            </Page>
    </Document>
);

export default PdfDocument;
