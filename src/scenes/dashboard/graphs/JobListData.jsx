// components/ExcelExportButton.tsx
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { dashboardJobList_data } from "../../../data/ApiController.js";



const ExcelExportButton = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const response = async () => {
            const bookingData = await dashboardJobList_data();
            setData(bookingData?.data);
        }
        response();
    }, [])

    const exportToExcel = () => {
        // Create a worksheet
        console.log(data)
        const worksheet = XLSX.utils.json_to_sheet(data.data);

        // Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Booking Details");

        // Trigger a download
        XLSX.writeFile(workbook, "BookingDetails.xlsx");
    };

    return (
        <button
            onClick={exportToExcel}
            className="bg-lime-600 text-white px-4 py-2 rounded shadow hover:bg-lime-500"
        >
            Export Booking Details to Excel
        </button>
    );
};

export default ExcelExportButton;
