import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { deleteServiceTimeById,updateServiceTime } from "../../data/ApiController.js";

const ServiceTimeHelper = ({ serviceTime, setServiceTime }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedRow, setEditedRow] = useState({});
  const [editedData, setEditedData] = useState({});

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`This field with ID ${id} will be permanently deleted. Are you sure?`);
    if (confirmDelete) {
      await deleteServiceTimeById(id);
      setServiceTime(serviceTime.filter((st) => st.id !== id));
    }
  };

  const handleEdit = (params) => {
    setEditedRow(params.row);
    setEditedData({ ...params.row }); // Copy the row data to editedData
    setEditDialogOpen(true);
    console.log(params.row)
  };

  const handleUpdate = async (id,editedData) => {
    // Call your updateData function here with editedData
    await updateServiceTime(id,editedData);

    // Close the edit dialog
    setEditDialogOpen(false);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
  };

  const columns = [
    { field: "shown_id", headerName: "ID", width: 250 },
    { field: "service_name", headerName: "Service", width: 200 },
    { field: "number_of_installs", headerName: "Number of Installs", width: 150 },
    { field: "time_min", headerName: "Minimum Time", width: 130 },
    { field: "time_max", headerName: "Maximum Time", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="outlined" color="primary" onClick={() => handleEdit(params)} style={{marginRight:"5px"}}>
            Edit
          </Button>
          <Button variant="outlined" color="warning" onClick={() => handleDelete(params.row.id)} style={{marginLeft:"16px"}}>
            Delete
          </Button>
        </>
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
          rows={serviceTime}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Dialog open={editDialogOpen} onClose={handleClose} >
        <DialogTitle >Edit Row</DialogTitle>
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
            disabled
            fullWidth
            style={{marginBottom:"6px"}}
          />
          <TextField
            label="Minimum Time"
            value={editedData.time_min || ""}
            onChange={(e) => setEditedData({ ...editedData, time_min: e.target.value })}
            fullWidth
            style={{marginBottom:"6px"}}
          />
          <TextField
            label="Maximum Time"
            value={editedData.time_max || ""}
            onChange={(e) => setEditedData({ ...editedData, time_max: e.target.value })}
            fullWidth
            style={{marginBottom:"6px"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="warning">Cancel</Button>
          <Button onClick={()=>handleUpdate(editedData.id,editedData)} color="primary" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceTimeHelper;
