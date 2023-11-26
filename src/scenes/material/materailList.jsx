import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { deleteMaterialById } from "../../data/ApiController.js";

// import { deleteMaterial, getMaterials } from "api/materials";




const MaterialList = ({ material, setMaterial }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);





  const handleDelete = async (id) => {
    console.log(id)
    await deleteMaterialById(id);
    setMaterial(material.filter((st) => st.id !== id));
  };
  const columns = [
    { field: "shown_id", headerName: "ID", width: 250 },
    { field: "material_name", headerName: "Material Name", width: 150 },
    { field: "material_desc", headerName: "Material Description", width: 150 },
    { field: "service_code", headerName: "Service", width: 100 },
    { field: "number_of_chargers", headerName: "Number of Installs", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="warning"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <Box  style={{alignItems:"center"}}>
         <Box
          m="40px 0 0 0"
          height="70vh"
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
          rows={material}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
       
        />
      </Box>
    </Box>
  );
};
export default MaterialList;