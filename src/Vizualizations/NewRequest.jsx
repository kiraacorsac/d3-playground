import style from "./NewRequest.module.css";
import { useState, useEffect } from "react";

import * as XLSX from "xlsx/xlsx.mjs";
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>;


export default function NewRequest(props) {
    const [file, setFile] = useState("");
    function onFileChange(e) {
        setFile(e.target.files);
    }

    useEffect(() => {
        if (file.length < 1) return;
        console.log("file > 1");

        var fileReader = new FileReader();
        const rABS = !!fileReader.readAsBinaryString;
        fileReader.onload = (e) => {
            var workbook = XLSX.read(file, {
                type: rABS ? "binary" : "array",
            });
            console.log(workbook);
        };
        if (rABS) fileReader.readAsBinaryString(file[0]);
        else fileReader.readAsArrayBuffer(file);


    }, [file]);

    function capitalize(s) {
        s.toLowerCase();
        return s && s[0].toUpperCase() + s.slice(1);
    }

    const [excelFile, setExcelFile] = useState(props.excelFile);
    const [typeError, setTypeError] = useState(null);

    // submit state
    const [excelData, setExcelData] = useState(props.excelData);

    // onchange event
    const handleFile = (e) => {
        let fileTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
        ];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                };
            } else {
                setTypeError("Please select only excel file types");
                setExcelFile(null);
            }
        } else {
            console.log("Please select your file");
        }
    };

    // submit event
    const handleFileSubmit = (e) => {
        console.log("start");
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: "buffer" });
            console.log("workbook", workbook.SheetNames);
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice());
        }
    };

    return (
        <>


            <div className="wrapper">
                <h3>Upload & View MDS form</h3>

                {/* form */}
                <form
                    className="form-group custom-form"
                    onSubmit={handleFileSubmit}
                >
                    <input
                        type="file"
                        className="form-control"
                        required
                        onChange={handleFile}
                    />
                    <button type="submit" className="btn btn-success btn-md">
                        UPLOAD
                    </button>
                    {typeError && (
                        <div className="alert alert-danger" role="alert">
                            {typeError}
                        </div>
                    )}
                </form>

                {/* view data */}
                <div className="viewer">
                    {excelData ? (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        {Object.keys(excelData[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {excelData.map((individualExcelData, index) => (
                                        <tr key={index}>
                                            {Object.keys(individualExcelData).map((key) => (
                                                <td key={key}>{individualExcelData[key]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>No File is uploaded yet!</div>
                    )}
                </div>
            </div>



        </>
    );
}
