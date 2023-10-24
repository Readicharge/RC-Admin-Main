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
    { field: "shown_id", headerName: "ID", width: 100 },
    { field: "service_name", headerName: "Service", width: 100 },
    { field: "number_of_installs", headerName: "Number of Installs", width: 150 },
    { field: "time_min", headerName: "Minimum Time", width: 130 },
    { field: "time_max", headerName: "Maximum Time", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => handleEdit(params)} style={{marginRight:"5px"}}>
            Edit
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDelete(params.row.id)} style={{marginLeft:"16px"}}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box m="40px 0 0 0" height="75vh"
      
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
        }} /* Rest of the styles */>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleUpdate(editedData.id,editedData)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceTimeHelper;
