import React from "react";
import pdfFile from '../../../public/pdf/izika5.pdf'
import "./Calendar.css"

export default function Calendar() {
       return (<>
        <div>
        <iframe src={pdfFile}  /> 
        </div>
    </>)
};