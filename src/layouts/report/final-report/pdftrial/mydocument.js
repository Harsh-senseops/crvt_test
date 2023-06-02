import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import logo from "../../src/logo192.png"
import selectData from './selectData';

// Create styles
const styles = StyleSheet.create({
    table: { 
        display: "table", 
        width: "95%", 
        marginLeft: "2%",
        marginTop: "2%",
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "25%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableColLine1: { 
        width: "100%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableColLine2: { 
        width: "16.65%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableColLine3: { 
        width: "16.65%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableColLine4: { 
        width: "83.35%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableColLine5: { 
        width: "20%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableColLine6: { 
        width: "33.33%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableColLine7: { 
        width: "50%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
      },
      logoStyle: {
        width: 50,
        height: 50
      }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    {/* <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page> */}
    <Page style={styles.body}>
        <View style={styles.table}> 
          <View style={styles.tableRow}> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Logo</Text> 
              {/* <Image style={styles.logoStyle} src={logo} /> */}
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>CENTER OF RELIABILITY AND VALIDATION TESTING LAB REPORTFORMAT</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Format Revision Number: 2</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Format Revision Date: 10/10/2021</Text> 
            </View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={styles.tableColLine1}> 
              <Text style={styles.tableCell}>CENTRAL QUALITY HM2G</Text> 
            </View>  
          </View> 
          <View style={styles.tableRow}>
              <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>PART NAME</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>HMCL PART CODE</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
            <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>REPORT NO.</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>{selectData.reportNo}</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>VENDOR NAME/CODE</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>VENDOR PART CODE</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
            <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>Report date.</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>{selectData.reportDate}</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>PLANT</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>VENDOR MFG LOCATION</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
            <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>TEST START DATE</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>INSPECTION LOT NO</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>INSPECTION LOT QTY</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
            <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>TEST END DATE</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>INSPECTION LOT DATE</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>PART MFG MONTH</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
            <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>NO OF SAMPLES</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>INSPECTION LOT DATE</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>PART MFG MONTH</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
            <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>NO OF SAMPLES</Text>
                </View>
                <View style={styles.tableColLine2}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>OBJECTIVE</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>TYPE OF TEST</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>DETAILS OF MODIFICATION</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>TEST STANDARD</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>TEST CONDITION AND METHOD</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>TEST DURATION</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine5}>
                    <Text style={styles.tableCell}>PARAMETER</Text>
                </View>
                <View style={styles.tableColLine5}>
                    <Text style={styles.tableCell}>BEFORE TEST</Text>
                </View>
                <View style={styles.tableColLine5}>
                    <Text style={styles.tableCell}>AFTER TEST</Text>
                </View>
                <View style={styles.tableColLine5}>
                    <Text style={styles.tableCell}>BEFORE TEST RESULT</Text>
                </View>
                <View style={styles.tableColLine5}>
                    <Text style={styles.tableCell}>AFTER TEST RESULT</Text>
                </View>
          </View>
          <View style={styles.tableRow}> 
            <View style={styles.tableColLine1}> 
              <Text style={styles.tableCell}>Component based Parameter information</Text> 
            </View>  
          </View> 
          <View style={styles.tableRow}> 
            <View style={styles.tableColLine1}> 
              <Text style={styles.tableCell}>PHOTOGRAPHS:-</Text> 
            </View>  
          </View> 
          <View style={styles.tableRow}> 
            <View style={styles.tableColLine1}> 
              <Text style={styles.tableCell}>After test</Text> 
            </View>  
          </View> 
          <View style={styles.tableRow}> 
            <View style={styles.tableColLine6}> 
              <Text style={styles.tableCell}>N1</Text> 
            </View>  
            <View style={styles.tableColLine6}> 
              <Text style={styles.tableCell}>N2</Text> 
            </View>  
            <View style={styles.tableColLine6}> 
              <Text style={styles.tableCell}>N3</Text> 
            </View>  
          </View> 
          <View style={styles.tableRow}> 
            <View style={styles.tableColLine1}> 
              <Text style={styles.tableCell}>Component pictures</Text> 
            </View>  
          </View> 
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>OBSERVATION</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>ANALYSIS</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine3}>
                    <Text style={styles.tableCell}>RESULT</Text>
                </View>
                <View style={styles.tableColLine4}>
                    <Text style={styles.tableCell}>abc</Text>
                </View>
          </View>
          <View style={styles.tableRow}>
              <View style={styles.tableColLine7}>
                    <Text style={styles.tableCell}>TESTED BY</Text>
                </View>
                <View style={styles.tableColLine7}>
                    <Text style={styles.tableCell}>VERIFIED BY</Text>
                </View>
          </View>
        </View>
      </Page>
  </Document>
);

export default MyDocument