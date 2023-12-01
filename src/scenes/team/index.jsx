import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Tabs,
  Tab, Box, TextField, useTheme, Button, Dialog, DialogTitle, Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails, DialogContent, DialogActions, Alert
} from "@mui/material";
import { getInstallerList, deleteInstaller, updateInstaller, getServiceNameById, createInstaller, getserviceList } from "../../data/ApiController.js";
import InstallerServicesPieChart from "../../components/PieChart";
import GeographyChart_02 from "../../components/Geographychart_02";


const formatDate = (date) => {
  if (!date) {
    return ''; // Return an empty string for null values
  }
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const handleUpdate = async (id, row) => {
  console.log(row)
  const response = await updateInstaller(id, row);
  if (response.status === 200) alert("done")
  getInstallerList(); // Refresh the installer list after update
};
const getCountBasedPadStart = (count) => {
  if (count < 10) {
    return 5;
  } else if (count < 100) {
    return 4;
  } else if (count < 1000) {
    return 3;
  } else if (count < 10000) {
    return 2;
  }
  else {
    // add more conditions as needed
    return 1; // fallback value
  }
};


const createInstallersFromCSV = async (installerData) => {
  for (let i = 0; i < installerData.length; i++) {
    const dataObject = installerData[i];
    const fields1 = [
      'user_id', 'firstName', 'lastName', 'companyName', 'email', 'password',
      'phoneNumber', 'yearsOfExperience', 'description', 'addressLine1',
      'addressLine2', 'city', 'zip', 'miles_distance', 'state'
    ];
    const formData1 = fields1.reduce((acc, field) => {
      acc[field] = dataObject[field];
      return acc;
    }, {});

    const fields2 = [
      'licenseNumber', 'licenseExpirationDate', 'businessInsuranceCompany',
      'businessInsuranceNumber', 'businessAgentPhoneNumber', 'businessPolicyNumber',
      'businessInsuranceEffectiveStartDate', 'businessInsuranceEffectiveEndDate',
      'bondingCertificationNumber', 'bondingCompany', 'bondingAgentPhoneNumber',
      'bondAmount', 'bondingEffectiveStartDate', 'bondingEffectiveEndDate'
    ];
    const formData2 = fields2.reduce((acc, field) => {
      acc[field] = dataObject[field];
      return acc;
    }, {});

    const selectedServiceIds = dataObject.services.map((service) => service._id);
    const newInstaller = { ...formData1, ...formData2, "services": selectedServiceIds };
    await createInstaller(newInstaller);
  }
};

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

const InstallerList = () => {
  const [getInstaller, setGetInstallerList] = useState([]);
  const [selectedInstaller, setSelectedInstaller] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pieData, setPieData] = useState([]);
  const [formState, setFormState] = useState(
    states.map((state) => ({ state, count: 0 }))
  );

  const fetchInstallerList = async () => {
    const installerData = await getInstallerList();
    console.log(installerData.data.odata.length);

    // for the Geo map this section of code is being used 
    if (installerData.data.odata.length > 0) {
      const updatedFormState = formState.map((formStateItem) => {
        const correspondingItems = installerData.data.odata.filter(
          (item) => item.state === formStateItem.state
        );
        console.log(formStateItem.state)
        const count = correspondingItems.length;
        return { state: formStateItem.state, count };
      });
      setFormState(updatedFormState);
    }

    var temp_data = [];
    for (let i = 0; i < installerData.data.odata.length; i++) {
      const dataObject = installerData.data.odata[i];

      // For the installer Id Count  ** These ID is use for no technical functionalities , just for the client demand for the better reference 
      const count = i + 1;
      const padStartCount = getCountBasedPadStart(count);

      const iverified = dataObject.clearCheck_status.verified;
      const icompleted = dataObject.clearCheck_status.completed;
      let data_to_be_pushed = {
        verified: iverified,
        completed: icompleted,
        status: (iverified === true && icompleted === true) ? "Certified" : (iverified === false && icompleted === true) ? "Not Certified" : "Not Applied",
        id: dataObject._id,
        shown_id: `RC-IN-${count.toString().padStart(padStartCount, "0")}`,
        name: `${dataObject.firstName} ${dataObject.lastName}`,
        firstName: dataObject.firstName,
        lastName: dataObject.lastName,
        companyName: dataObject.companyName,
        email: dataObject.email,
        password: dataObject.password,
        phoneNumber: dataObject.phoneNumber,
        yearsOfExperience: dataObject.yearsOfExperience,
        description: dataObject.description,
        addressLine1: dataObject.addressLine1,
        addressLine2: dataObject.addressLine2,
        city: dataObject.city,
        zip: dataObject.zip,
        miles_distance: dataObject.miles_distance,
        state: dataObject.state,
        licenseNumber: dataObject.licenseNumber,
        licenseExpirationDate: dataObject.licenseExpirationDate,
        businessInsuranceCompany: dataObject.businessInsuranceCompany,
        businessInsuranceNumber: dataObject.businessInsuranceNumber,
        businessAgentPhoneNumber: dataObject.businessAgentPhoneNumber,
        businessPolicyNumber: dataObject.businessPolicyNumber,
        businessInsuranceEffectiveStartDate: dataObject.businessInsuranceEffectiveStartDate,
        businessInsuranceEffectiveEndDate: dataObject.businessInsuranceEffectiveEndDate,
        bondingCertificationNumber: dataObject.bondingCertificationNumber,
        bondingCompany: dataObject.bondingCompany,
        bondingAgentPhoneNumber: dataObject.bondingAgentPhoneNumber,
        bondAmount: dataObject.bondAmount,
        bondingEffectiveStartDate: dataObject.bondingEffectiveStartDate,
        bondingEffectiveEndDate: dataObject.bondingEffectiveEndDate,
        services: dataObject.services,
        changedBy: dataObject.changedBy,
        number_of_jobs: dataObject.Number_of_bookings,
        ratingsAndReviews: dataObject.ratingsAndReviews
      };

      temp_data.push(data_to_be_pushed);
    }
    setGetInstallerList(temp_data);
  };

  useEffect(() => {
    fetchInstallerList();
  }, []);

  useEffect(() => {
    if (getInstaller.length > 0) {
      const services = {};
      getInstaller.forEach((installer) => {
        if (installer.services) {
          installer.services.forEach((serviceId) => {
            if (!services[serviceId]) {
              services[serviceId] = { count: 0 };
            }
          });
        }
      });
      getInstaller.forEach((installer) => {
        if (installer.services) {
          installer.services.forEach((serviceId) => {
            if (services[serviceId]) {
              services[serviceId].count++;
            }
          });
        }
      });


      const fetchData = async () => {

        const pieData = await Promise.all(
          Object.keys(services).map(async (serviceId) => {
            try {
              const serviceName = await getServiceNameById(serviceId);

              return {
                id: serviceId,
                label: serviceName,
                value: services[serviceId].count,
              };
            } catch (error) {
              console.error(`Error fetching service name for id ${serviceId}:`, error);
              // You can handle errors here, e.g., return a default label
              return {
                id: serviceId,
                label: "Unknown Service",
                value: services[serviceId].count,
              };
            }
          })
        );

        setPieData(pieData);
      };

      fetchData();
    }
  }, [getInstaller]);


  const handleOpenModal = (installer) => {
    console.log(installer)
    setSelectedInstaller(installer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInstaller(null);
    setIsModalOpen(false);
  };


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    { field: "shown_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true, // Make this cell editable
      cellClassName: "name-column--cell",
      width: 100
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      width: 400,
      editable: true, // Make this cell editable
    },
    {
      field: "state",
      headerName: "State",
      headerAlign: "left",
      align: "left",
      width: 100,
      // Make this cell editable
    },
    {
      field: "zip",
      headerName: "Zip code",
      headerAlign: "left",
      align: "left",
      width: 100,
      // Make this cell editable
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "left",
      align: "left",
      width: 100,
      renderCell: (params) => {
        if (params.row.verified === true && params.row.completed === true) {
          return (
            <div style={{ color: "#09111A", backgroundColor: "#81E1D7", padding: "5px", borderRadius: "14px" }}>
              Certified
            </div>
          )
        }
        else if (params.row.verified === false && params.row.completed === true) {
          return (
            <div style={{ color: "#09111A", backgroundColor: "#F194AB", padding: "5px", borderRadius: "14px" }}>
              Not Certified
            </div>
          )
        }
        else if (params.row.verified === false && params.row.completed === false) {
          return (
            <div style={{ color: "#09111A", backgroundColor: "#EBCB8B", padding: "5px", borderRadius: "14px" }}>
              Not Applied
            </div>
          )
        }
      }
    },
    {

      field: "Number_of_bookings",
      headerName: "Jobs Completed",
      flex: 1,
      editable: true, // Make this cell editable
    },
    {
      field: "ratingsAndReviews",
      headerName: "Rating",
      flex: 1,
      editable: true, // Make this cell editable
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      width: 410,

      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            style={{ marginLeft: "16px" }}
            color="success"
            disabled={params.row.verified === true && params.row.completed === true}
            onClick={() => alert("Mail for background Check sent to Installer")}
          >
            Background Check
          </Button>
         
          <Button
            variant="outlined"
            style={{ marginLeft: "16px" }}
            color="primary"
            onClick={() => handleOpenModal(params.row)}
          >
            Edit Details
          </Button>
          <Button
            variant="outlined"
            color="warning"
            style={{ marginLeft: "16px" }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),

    }
  ];

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `This field with ID ${id} will be permanently deleted. Are you sure?`
    );
    if (confirmDelete) {
      await deleteInstaller(id);
      fetchInstallerList(); // Refresh the bookings list after deletion
    }
  };



  const handleImportCSV = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Send the CSV file to the createInstaller function for each row
    try {
      const response = await createInstallersFromCSV();
      if (response) getInstallerList();
      else {
        console.error("Failed to import CSV file");
      }
    } catch (error) {
      console.error("Error occurred while importing CSV file:", error);
    }
  };

  return (
    <div style={{ overflowY: 'auto', height: 'calc(110vh)' }}>
      <Box m="20px">
        <Header
          title="Installer List"
          subtitle="Managing the Installers on the platform"
        />

        <Box
          m="40px 0 0 0"
          height="70vh"
          sx={{
            "& .MuiDataGrid-toolbar": {
              color: "#fff"
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
          {/* <Box m="20px">
            <input 
              accept=".csv"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImportCSV}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Import CSV
              </Button>
            </label>
          </Box> */}
          <DataGrid
            rows={getInstaller}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />
          <InstallerDetailsModal selectedInstaller={selectedInstaller} handleCloseModal={handleCloseModal} isModalOpen={isModalOpen} handleUpdate={handleUpdate} />
        </Box>
      </Box>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "90px" }}>

        <div style={{ marginTop: "10vh", marginBottom: "10vh", display: "flex" }}>
          <Header title="Installers per State" subtitle="Installers List per state" />
          <GeographyChart_02 data={formState} />
        </div>

      </div>


    </div>
  );
};

export default InstallerList;






// Modal Component 

const InstallerDetailsModal = ({
  selectedInstaller,
  handleCloseModal,
  isModalOpen,
  handleUpdate,
}) => {
  const [formData, setFormData] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (selectedInstaller) {
      setFormData(selectedInstaller);
    }
  }, [selectedInstaller]);

  const handleTabChange = (event, newValue) => {
    // You can handle the tab change here if needed
    setSelectedTab(newValue)
  };

  useEffect(() => {
    // Fetch the list of services from an API or any data source
    // For simplicity, we'll use a static array of services here
    const fetchServices = async () => {
      const response = await getserviceList();
      const data = await response.data
      setServices(data);
    };

    fetchServices();
  }, []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    const serviceId = value;
    setFormData((prevFormData) => {
      const updatedServices = checked
        ? [...prevFormData.services, serviceId]
        : prevFormData.services.filter((id) => id !== serviceId);

      return {
        ...prevFormData,
        services: updatedServices,
      };
    });
  };

  if (!formData) {
    return null; // You can render a loading spinner or placeholder while waiting for selectedInstaller data
  }


  return (


    <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle style={{ fontSize: 24, alignItems: "center" }}>Installer Details</DialogTitle>
      <DialogContent>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary" aria-label="full width tabs example">
          <Tab style={{ fontSize: 16 }} label="Personal Information" />
          <Tab style={{ fontSize: 16 }} label="Certifications" />
          <Tab style={{ fontSize: 16 }} label="Services" />
        </Tabs>
        <Box p={4}>
          {/* Personal Information Tab */}
          <div role="tabpanel" hidden={selectedTab !== 0}>
            <Accordion>
              <AccordionSummary>
                <Typography style={{ fontWeight: "bold" }}>Address Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column">
                  <TextField
                    name="addressLine1"
                    label="Address Line 1"
                    value={formData.addressLine1 || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="addressLine2"
                    label="Address Line 2"
                    value={formData.addressLine2 || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="city"
                    label="City"
                    value={formData.city || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="zip"
                    label="ZIP"
                    value={formData.zip || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="miles_distance"
                    label="Miles Distance"
                    type="number"
                    value={formData.miles_distance || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="state"
                    label="State"
                    value={formData.state || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary >
                <Typography style={{ fontWeight: "bold" }}>Contact Info</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column">
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={formData.firstName || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={formData.email || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary >
                <Typography style={{ fontWeight: "bold" }}>Profile</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column">
                  {/* Add the rest of the profile fields here */}
                  <TextField
                    name="shown_id"
                    label="User ID"
                    value={formData.shown_id || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="companyName"
                    label="Company Name"
                    value={formData.companyName || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="yearsOfExperience"
                    label="Years of Experience"
                    type="number"
                    value={formData.yearsOfExperience || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="description"
                    label="Description"
                    value={formData.description || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Certifications Tab */}
          <div role="tabpanel" hidden={selectedTab !== 1}>
            <Accordion>
              <AccordionSummary>
                <Typography style={{ fontWeight: "bold" }}>License Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column">
                  <TextField
                    name="licenseNumber"
                    label="License Number"
                    value={formData.licenseNumber || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="licenseExpirationDate"
                    label="License Expiration Date"
                    type="date"
                    value={formatDate(formData.licenseExpirationDate) || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary>
                <Typography style={{ fontWeight: "bold" }}>Business Insurance Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column">
                  <TextField
                    name="businessInsuranceCompany"
                    label="Business Insurance Company"
                    value={formData.businessInsuranceCompany || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="businessInsuranceNumber"
                    label="Business Insurance Number"
                    value={formData.businessInsuranceNumber || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="businessAgentPhoneNumber"
                    label="Business Agent Phone Number"
                    value={formData.businessAgentPhoneNumber || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="businessPolicyNumber"
                    label="Business Policy Number"
                    value={formData.businessPolicyNumber || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="businessInsuranceEffectiveStartDate"
                    label="Business Insurance Effective Start Date"
                    type="date"
                    value={formatDate(formData.businessInsuranceEffectiveStartDate) || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    name="businessInsuranceEffectiveEndDate"
                    label="Business Insurance Effective End Date"
                    type="date"
                    value={formatDate(formData.businessInsuranceEffectiveEndDate) || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary>
                <Typography style={{ fontWeight: "bold" }}>Bonding Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column">
                  <TextField
                    name="bondingCertificationNumber"
                    label="Bonding Certification Number"
                    value={formData.bondingCertificationNumber || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="bondingCompany"
                    label="Bonding Company"
                    value={formData.bondingCompany || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="bondingAgentPhoneNumber"
                    label="Bonding Agent Phone Number"
                    value={formData.bondingAgentPhoneNumber || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="bondAmount"
                    label="Bond Amount"
                    type="number"
                    value={formData.bondAmount || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="bondingEffectiveStartDate"
                    label="Bonding Effective Start Date"
                    type="date"
                    value={formatDate(formData.bondingEffectiveStartDate) || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    name="bondingEffectiveEndDate"
                    label="Bonding Effective End Date"
                    type="date"
                    value={formatDate(formData.bondingEffectiveEndDate) || ''}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Services Tab */}
          <div role="tabpanel" hidden={selectedTab !== 2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Services</FormLabel>
              <FormGroup>
                {services.map((service) => (
                  <FormControlLabel
                    key={service._id}
                    control={
                      <Checkbox
                        checked={formData.services.includes(service._id)}
                        onChange={handleServiceChange}
                        value={service._id.toString()}
                      />
                    }
                    label={service.name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} variant="outlined" color="warning">Close</Button>
        <Button onClick={() => handleUpdate(selectedInstaller.id, formData)} variant="outlined" color="primary">Update and Save</Button>
      </DialogActions>
    </Dialog>


  );
};

