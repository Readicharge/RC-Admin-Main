import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PasswordModal from '../global/passwordConfirm.jsx';
import {updateMaterial } from "../../data/ApiController.js";

// import { deleteMaterial, getMaterials } from "api/materials";




const MaterialList = ({ material, setMaterial }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedRow, setEditedRow] = useState({});
  const [editedData, setEditedData] = useState({});
  const [modalOpen_Confirm, setModalOpen_Confirm] = useState(false);



const handleEdit = (params) => {
    setEditedRow(params.row);
    setEditedData({ ...params.row }); // Copy the row data to editedData
    setEditDialogOpen(true);
  };

  const handleUpdate = async  (id,editedData) => {
    // Call your updateData function here with editedData
    // updateData(editedData);
    console.log("editedData",editedData)
    const response = await updateMaterial(id,editedData);
    console.log(response)
    // Close the edit dialog
    // setEditDialogOpen(false);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
  };



  const handleOpenModal_Confirm = () => {
    setModalOpen_Confirm(true);
  };

  const handleCloseModal_Confirm = () => {
    setModalOpen_Confirm(false);
  };



  // const handleDelete = async (id) => {
  //   console.log(id)
  //   await deleteMaterialById(id);
  //   setMaterial(material.filter((st) => st.id !== id));
  // };



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
          color="primary"
          onClick={() => handleEdit(params)}
        >
          Update
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

      {/* Modal for the Edit Price */}
      <Dialog open={editDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent style={{padding:"20px"}}>
          {/* Render the editable fields here */}
          <TextField
            label="Service"
            value={editedData.service_name || ""}
            disabled
            fullWidth
            style={{marginBottom:"6px"}}
          />
          <TextField
            label="Number of Installs"
            value={editedData.number_of_installs || ""}
            onChange={(e) => setEditedData({ ...editedData, number_of_installs: e.target.value })}
            fullWidth
            disabled
            style={{marginBottom:"6px"}}
          />
          <TextField
            label="Price"
            value={editedData.price || ""}
            onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
            fullWidth
            style={{marginBottom:"6px"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  variant="outlined" color="warning">Cancel</Button>
          <Button onClick={()=>handleOpenModal_Confirm(editedData.id,editedData)} color="primary" variant="outlined"> 
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <PasswordModal open={modalOpen_Confirm} handleClose={handleCloseModal_Confirm} onConfirm={()=>{handleUpdate(editedRow.id,editedData)}} />
    </Box>
  );
};
export default MaterialList;