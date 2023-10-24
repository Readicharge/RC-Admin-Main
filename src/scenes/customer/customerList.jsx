import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  DataGrid,
  GridToolbar,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Replace this import with the actual API function that fetches customer data
import { getCustomerData, deleteCustomerById } from "../../data/ApiController.js";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchCustomerList = async () => {
    const customerData = await getCustomerData();
    setCustomers(customerData.data);
  };

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    await deleteCustomerById(id);
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const columns = [
    { field: "shown_id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "additionalNotes", headerName: "Additional Notes", width: 300 },
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
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#94d034",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#f0f0f0",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#94d034",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[700]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#141E5A !important`,
          },
        }}
      >
        <DataGrid
          rows={customers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          className="col-span-12 bg-white p-4 shadow-md rounded-xl"
        />
      </Box>
    </Box>
  );
};

export default CustomerList;
