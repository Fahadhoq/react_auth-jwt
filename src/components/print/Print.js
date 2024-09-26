import React, { useEffect } from 'react'
import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
    Font,
} from '@react-pdf/renderer';
import logo from '../../assets/images/3.jpg'
import { useState } from 'react';


//bangla font
import notoSansBengaliRegular from '../../assets/fonts/static/NotoSansBengali-Regular.ttf';
import notoSansBengaliBold from '../../assets/fonts/static/NotoSansBengali-Bold.ttf';

Font.register({
    family: 'Noto Sans Bengali',
    fonts: [
        { src: notoSansBengaliRegular, fontWeight: 'normal' },
        { src: notoSansBengaliBold, fontWeight: 'bold' },
    ],
});

//style
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: '10px'
    },
    topSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'strat',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    item_section: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: '100px',
        height: 'auto',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 0,
        borderColor: '#000000',
    },
    mainTableHeaderRow: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        borderTop: '1px solid #e8e8e8',
        borderBottom: '1px solid #e8e8e8'
    },
    tableCell: {
        flex: 1,
        fontSize: 10,
        padding: '6px',
        borderStyle: 'solid',
        borderWidth: 0,
        borderColor: '#000000',
    },
    headerRowCenter: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans Bengali'
    },
    tableLoopHeaderRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #e8e8e8'
    },
    headerRowLeft: {
        textAlign: 'left',
        color: '#000000',
        fontWeight: 'bold',
    },
    rowCenter: {
        textAlign: 'center',
    },
    footerText: {
        position: "absolute",
        bottom: "10px",
        left: '10px',
        right: '10px',
        fontSize: 10,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Noto Sans Bengali' //for bangla text 
    },
})

export default function Print({user,postList}) {
    const [numPages, setNumPages] = useState(0);

    const generatePDFContent = () => {
        // Your PDF content generation logic here
        // For this example, let's use some dummy text
        const content = Array.from({ length: 100 }).map((_, index) => (
            <Text key={index} style={{ marginBottom: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
        ));

        return content;
    };
    useEffect(() => {
        const pdfContent = generatePDFContent();
        // Calculate the number of pages (estimated)
        const estimatedNumPages = Math.ceil(pdfContent.length / 20); // Assuming 20 lines per page
        setNumPages(estimatedNumPages);
    }, []);
    console.log(postList);

  return (
       <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.topSection}>
                <View style={styles.item_section}>
                    <View>
                        <Text style={{ fontSize: '17px' }}>
                            PRINT
                        </Text>
                        <Text style={{ fontWeight: '800', fontSize: '14px', margin: '5px 0px' }}>
                            {user.name}
                        </Text>
                    </View>
                    <Image
                        src={logo}
                        style={styles.logo}
                    />
                </View>
            </View>

            <View style={{ ...styles.item_section, marginTop: '20px' }}>
                    <View style={styles.table}>
                        <View style={styles.mainTableHeaderRow}>
                            <View style={styles.tableCell}>
                                <Text style={[styles.headerRowCenter]}>ID</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={[styles.headerRowCenter]}>TITLE 	</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={[styles.headerRowCenter]}>BODY</Text>
                            </View>
                        </View>
                    </View>
            </View>

                {
                    postList?.map((res, index) => (
                        <Row key={index} i={index} row={res}  />
                    ))
                }

                {/* bangla print */}
                <View style={styles.footerText}>
                    <View>
                        <Text style={{ fontSize: '8px', color: '#858585' }}>
                            বাংলা একটি সমৃদ্ধ ভাষা। এই ভাষায় সাহিত্য, সংস্কৃতি, এবং ইতিহাসের গভীরতা অসামান্য।
                        </Text>
                    </View>
                </View>
        </Page>
       </Document>
  )
}

function Row(props) {
    const { row, i } = props;
    
    return (
        <View style={styles.item_section}>
            <View style={styles.table}>
                <View style={styles.tableLoopHeaderRow}>
                    <View style={styles.tableCell}>
                        <Text style={styles.headerRowLeft}>{row.id ? row.id : '-'}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text style={styles.rowCenter}> {row.title ? row.title : '-'}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text style={styles.rowCenter}>{row.body}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
