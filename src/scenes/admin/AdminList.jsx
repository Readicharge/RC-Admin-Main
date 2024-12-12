import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, useTheme, Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tabs, Tab } from "@mui/material";
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
  const [tabValue, setTabValue] = useState(0);

  const fetchAdminList = async () => {
    const adminData = await getAdminData();
    var temp_data = [];
    var tempEditableFields = [];
    var tempCheckboxStates = {};

    for (let i = 0; i < adminData.data.odata.length; i++) {
      const dataObject = adminData.data.odata[i];
      let roles = dataObject.roles || [];

      let data_to_be_pushed = {
        shown_id: dataObject.readicharge_unique_id,
        id: dataObject._id,
        name: dataObject.name,
        email: dataObject.email,
        phoneNumber: dataObject.phoneNumber,
        address: dataObject.address,
        roles: roles,
        adminType: roles.some(role => ['Service', 'Materials', 'Labor Rate'].includes(role)) ? 'Static' : 'Dynamic',
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

  // ... (keep all other functions as they are)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`This field with ID ${id} will be permanently deleted. Are you sure?`);
    if (confirmDelete) {
      await deleteAdmin(id);
      fetchAdminList(); // Refresh the admin list after deletion
    }
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

  const staticRoles = ['Service', 'Materials', 'Labor Rate'];
  const dynamicRoles = ['Affiliate Admin', 'Support Admin', 'Inventory Admin', 'E-commerce', 'Supplier Management', 'Customer Support', 'Web Admin', 'Web Management', 'Blog Management'];

  const createColumns = (roles) => [
    {
      field: "shown_id",
      headerName: "ID",
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    {
      field: "name",
      headerName: "Name",
      width: 100,
      cellClassName: "name-column--cell",
      editable: true,
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
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

  const staticColumns = createColumns(staticRoles);
  const dynamicColumns = createColumns(dynamicRoles);

  return (
    <div style={{ overflowY: "auto", height: "calc(110vh)" }}>
      <Box m="20px">
        <Header title="Admin List" subtitle="Managing the Admins on the platform" />
        <Tabs value={tabValue} onChange={handleTabChange} sx={{
          "& .MuiTab-root": {
            color: "white", // Default text color
            textTransform: "none", // Keeps the text as is (no uppercase)
          },
          "& .Mui-selected": {
            color: "green", // Text color for the selected tab
            fontWeight: "bold", // Boldens the selected tab text
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#96d232", // Indicator line color
          },
        }} >
          <Tab label="Static Permissions" />
          <Tab label="Dynamic Permissions" />
        </Tabs>
        <Box
          m="40px 0 0 0"
          height="70vh"
          sx={{
            "& .MuiDataGrid-toolbar": {
              color: "#fff",
            },
            "& .MuiDataGrid-root": {
              border: "1px solid #06061E",
              backgroundColor: "#96D232",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              fontWeight: "bold"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #e1e1e1",

            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              borderTop: "1px solid #06061E",
              borderBottom: "1px solid #e1e1e1",
              color: "#06061E",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#EBEBEF"
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
              fontSize: 16
            },
          }}
        >
          {tabValue === 0 && (
            <DataGrid
              rows={getAdmin.filter(admin => admin.adminType === 'Static')}
              columns={staticColumns}
              components={{
                Toolbar: GridToolbar,
              }}
              disableSelectionOnClick
              onCellEditCommit={handleCellEditCommit}
            />
          )}
          {tabValue === 1 && (
            <DataGrid
              rows={getAdmin.filter(admin => admin.adminType === 'Dynamic')}
              columns={dynamicColumns}
              components={{
                Toolbar: GridToolbar,
              }}
              disableSelectionOnClick
              onCellEditCommit={handleCellEditCommit}
            />
          )}
        </Box>
      </Box>

      {/* Dialog for Editing Admin */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={updatedValues.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={updatedValues.email || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Modal for Deleting Admin */}
      <PasswordModal
        open={modalOpen_Confirm}
        onClose={handleCloseModal_Confirm}
        onSubmit={handleSave}
        title={"Confirm Admin Deletion"}
        action={"Confirm"}
        message={"Are you sure you want to delete this admin?"}
      />
    </div>
  );
};

export default AdminList;

