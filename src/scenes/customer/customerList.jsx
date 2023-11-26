import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Replace this import with the actual API function that fetches customer data
import { getCustomerData } from "../../data/ApiController.js";
import Header from "../../components/Header.jsx";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchCustomerList = async () => {
    const customerData = await getCustomerData();
    var iarr = [];
    for(let i=0;i<customerData.data.length;i++)
    {
        iarr.push({
            id: customerData.data[i]._id,
            readicharge_unique_id: customerData.data[i].readicharge_unique_id,
            first_name: customerData.data[i].first_name,
            last_name: customerData.data[i].last_name,
            email: customerData.data[i].email,
            phone_number: customerData.data[i].phone_number,
          });
    }
    console.log(iarr)
    setCustomers(iarr);
  };

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    // await deleteCustomerById(id);
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const columns = [
    { field: "readicharge_unique_id", headerName: "ID", width: 100 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    // { field: "address", headerName: "Address", width: 300 },
    // { field: "additionalNotes", headerName: "Additional Notes", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Customers" subtitle="Manage your customers here" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-toolbar" : {
            color:"#fff"
          },
          "& .MuiDataGrid-root": {
            border: "1px solid #06061E",
            backgroundColor:"#96D232",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            fontWeight:"bold"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e1e1e1",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            borderTop : "1px solid #06061E",
            borderBottom: "1px solid #e1e1e1",
            color: "#06061E",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e1e1e1",
            backgroundColor: "#96D232",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[700]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cellEditable": {
            backgroundColor: colors.greenAccent[100],
          },
        }}
      >
         <DataGrid
            rows={customers}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />
      </Box>
    </Box>
  );
};

export default CustomerList;
