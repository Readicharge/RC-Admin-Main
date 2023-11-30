import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, useTheme, Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { getAdminData, deleteAdmin, updateAdmin } from "../../data/ApiController.js";
import { useNavigate } from "react-router-dom";
import PasswordModal from '../global/passwordConfirm.jsx';
import Header from "../../components/Header"; 
import { tokens } from "../../theme";

const AdminList = () => {
  const [getAdmin, setGetAdmin] = useState([]);
  const [editableFields, setEditableFields] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const [modalOpen_Confirm, setModalOpen_Confirm] = useState(false);

  const fetchAdminList = async () => {
    const adminData = await getAdminData();
    var temp_data = [];
    var tempEditableFields = [];
    var tempCheckboxStates = {};

    for (let i = 0; i < adminData.data.odata.length; i++) {
      const dataObject = adminData.data.odata[i];
      let roles = dataObject.roles || [];

      let data_to_be_pushed = {
        shown_id:dataObject.readicharge_unique_id,
        id: dataObject._id,
        name: dataObject.name,
        email: dataObject.email,
        phoneNumber: dataObject.phoneNumber,
        address: dataObject.address,
        roles: roles,
      };

      temp_data.push(data_to_be_pushed);
      tempEditableFields.push(dataObject.email);
      tempCheckboxStates[dataObject.email] = roles.includes(dataObject.email);
    }

    setGetAdmin(temp_data);
    setEditableFields(tempEditableFields);
    setCheckboxStates(tempCheckboxStates);
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`This field with ID ${id} will be permanently deleted. Are you sure?`);
    if (confirmDelete) {
      await deleteAdmin(id);
      fetchAdminList(); // Refresh the admin list after deletion
    }
  };

  const handleUpdate = async (id, row) => {
    await updateAdmin(id, row);
    fetchAdminList(); // Refresh the admin list after update
  };

  const handleRoleCheckboxChange = async (adminId, role) => {
    const adminIndex = getAdmin.findIndex((admin) => admin.id === adminId);
    if (adminIndex !== -1) {
      const adminEmail = getAdmin[adminIndex].email;
      const updatedRolesCopy = [...getAdmin];
      const adminRoles = updatedRolesCopy[adminIndex].roles || [];

      if (adminRoles.includes(role)) {
        // Remove the role if already present
        const updatedRoles = adminRoles.filter((r) => r !== role);
        updatedRolesCopy[adminIndex].roles = updatedRoles;
      } else {
        // Add the role if not present
        updatedRolesCopy[adminIndex].roles = [...adminRoles, role];
      }

      setGetAdmin(updatedRolesCopy);
    }
  };

  const handleCellEditCommit = async ({ id, field, value }) => {
    const updatedAdmin = { ...getAdmin[id], [field]: value };
    await updateAdmin(id, updatedAdmin);

    fetchAdminList(); // Refresh the admin list after update
  };

  const handleEdit = (params) => {
    const selectedAdmin = getAdmin.find((admin) => admin.id === params.row.id);
    setSelectedRow(selectedAdmin);
    setOpen(true);
    setUpdatedValues(selectedAdmin);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdatedValues({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleOpenModal_Confirm = () => {
    setModalOpen_Confirm(true);
  };

  const handleCloseModal_Confirm = () => {
    setModalOpen_Confirm(false);
  };

  const handleSave = async () => {
    await updateAdmin(selectedRow.id, updatedValues);
    handleClose();
    fetchAdminList(); // Refresh the admin list after update
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const roles = ['Installer', 'Customer', 'Service','Company', 'Material', 'Payments','Labor','Booking','Helpdesk']

  const columns = [
    {
      field: "shown_id",
      headerName: "ID",
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    
    {
      field: "name",
      headerName: "Name",
      width:100,
      cellClassName: "name-column--cell",
      editable: true,
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    {
      field: "email",
      headerName: "Email",
      width:200,
      editable: false,
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
  
    ...roles.map((role) => ({
      field: role,
      headerName: role,
      flex: 1,
      editable: (params) => params.row.email === "Brian@readicharge.com",
      renderCell: (params) => (
        <Checkbox
          checked={params.row.roles.includes(params.field)}
          disabled={params.row.email === "Brian@readicharge.com"}
          onChange={() => handleRoleCheckboxChange(params.row.id, params.field)}
        />
      ),
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    })),
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) =>
        params.row.email === "Brian@readicharge.com" ? null : (
          <Box>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              style={{ marginLeft: "16px" }}
              color="primary"
              onClick={() => handleEdit(params)}
            >
              Edit
            </Button>
          </Box>
        ),
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
  ];

  return (
    <div style={{ overflowY: "auto", height: "calc(110vh)" }}>
      <Box m="20px">
        <Header title="Admin List" subtitle="Managing the Admins on the platform" />
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
              backgroundColor:"#EBEBEF"
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
            "& .highlighted-row": {
              backgroundColor: "#F0DD5D",
              fontWeight: "bold",
              fontSize:16
            },
          }}
        >
          <DataGrid
            rows={getAdmin}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            disableSelectionOnClick
            onCellEditCommit={handleCellEditCommit}
          />
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{fontSize:24, alignItems:"center"}}>Edit Admin</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <TextField
                name="name"
                label="Name"
                value={updatedValues.name || ""}
                onChange={handleInputChange}
                fullWidth
                style={{ marginBottom: "16px" ,marginTop:"16px" }}
              />
              <TextField
                name="email"
                label="Email"
                value={updatedValues.email || ""}
                onChange={handleInputChange}
                fullWidth
                disabled
                style={{ marginBottom: "16px" }}
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={updatedValues.phoneNumber || ""}
                onChange={handleInputChange}
                fullWidth
                style={{ marginBottom: "16px" }}
              />
              <TextField
                name="address"
                label="Address"
                value={updatedValues.address || ""}
                onChange={handleInputChange}
                fullWidth
                style={{ marginBottom: "16px" }}
              />
               <Typography style={{fontWeight:"bold", marginBottom:"20px"}}>Has access to :</Typography>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
             
                {roles.map((role) => (
                  <div key={role} style={{ marginRight: "16px" }}>
                    <Checkbox
                      checked={updatedValues.roles?.includes(role) || false}
                      onChange={() => handleRoleCheckboxChange(selectedRow.id, role)}
                    />
                    <Typography>{role}</Typography>
                  </div>
                ))}
              </div>
            </>

          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning" variant="outlined">
            Cancel
          </Button>
          <Button onClick={()=>handleOpenModal_Confirm()} color="primary" variant="outlined"> 
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <PasswordModal open={modalOpen_Confirm} handleClose={handleCloseModal_Confirm} onConfirm={()=>{handleSave()}} />
    </div>
  );
};

export default AdminList;
