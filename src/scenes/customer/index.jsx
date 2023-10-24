
import { Box, Button, TextField, Tab, Tabs, Typography, buttonGroupClasses } from "@mui/material";

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState, } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createCustomer } from "../../data/ApiController.js";



const CustomerForm = ({changedBy}) => {
  const [selectedState, setSelectedState] = useState('');
  const [formData1, setFormData1] = useState({});

  const isNonMobile = useMediaQuery("(min-width:600px)");



  const handleFormSubmit =  async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    setFormData1(data)
    console.log(formData1)
    const d = {
      first_name : formData1.firstName,
      last_name : formData1.lastName,
      email: formData1.email,
      password: formData1.password,
      address_line1:formData1.addressLine1,
      address_line2:formData1.addressLine2,
      city:formData1.city,
      state:formData1.state,
      zip_code:formData1.zipCode,
      phone_number:formData1.phoneNumber,

    }
    await createCustomer(d);

  };


  return (
    <Box m="20px">
      <Header title="Customer Details" subtitle="Enroll a new customer" />
      <form onSubmit={handleFormSubmit}>
       
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
              backgroundColor: "#f5f5f5",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            {/* Add Personal Information fields here */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              value={formData1.firstName}
              label="First Name"
              name="firstName"
              id="firstName"
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              value={formData1.lastName}
              name="lastName"
              id="lastName"
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              value={formData1.email}
              name="email"
              id="email"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="password"
              label="Password"
              value={formData1.password}
              name="password"
              id="password"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Phone Number"
              value={formData1.phoneNumber}
              name="phoneNumber"
              id="phoneNumber"
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address Line 1"
              value={formData1.addressLine1}
              name="addressLine1"
              id="addressLine1"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address Line 2"
              value={formData1.addressLine2}
              name="addressLine2"
              id="addressLine2"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="City"
              value={formData1.city}
              name="city"
              id="city"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Zip"
              value={formData1.zip}
              name="zip"
              id="zip"
              sx={{ gridColumn: "span 2" }}
            />
         
            <Grid item xs={3} md={2}>
              <FormControl fullWidth>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state"
                  name="state"
                  value={selectedState}
                  onChange={(event) => setSelectedState(event.target.value)}
                >
                  {usStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Box display="flex" mt="20px" gridColumn="span 4">
              <Button
                type="submit"
                style={{
                  backgroundColor: "#96D232",
                  padding: "8px",
                  color: "#fff",
                  borderRadius: "8px",
                }}
                variant="contained"
              >
                Submit and Continue
              </Button>
            </Box>
          </Box>
      </form>


    
     




    </Box>
  );
};
// Update initialValues and checkoutSchema with all the fields from the Installer model
export default CustomerForm;





const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];




