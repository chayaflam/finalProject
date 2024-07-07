import React from "react";
import pdfFile from '../../../public/pdf/calender.pdf'
import "./Calendar.css"

export default function Calendar() {
       return (<>
        <div className="pdf">
        <iframe src={pdfFile}  /> 
        </div>
    </>)
};