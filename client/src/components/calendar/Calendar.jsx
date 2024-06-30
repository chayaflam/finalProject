import React, { useEffect, useContext } from "react";
import calendar from '../../../public/img/calendar.jpg'
import { Document, Page } from 'react-pdf';
import pdfFile from '../../../public/pdf/izika5.pdf'
import "./Calendar.css"
export default function Calendar() {
   
    return (<>
        <div>
        <iframe src={pdfFile}  /> 
            {/* <Document src="../../../public/pdf/izika5.pdf">
                <Page pageNumber={1} />
            </Document> */}
        </div>
    </>)
};