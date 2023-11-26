import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { createAdmin } from '../../data/ApiController.js';

const AdminForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleFormSubmit = (values) => {
    const adminData = { ...values, roles: selectedRoles };

    createAdmin(adminData); // Assuming createAdmin accepts FormData
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(file);
  // };


  const checkoutSchema = yup.object().shape({
    name: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
    phoneNumber: yup.string().required('Phone number is required'),
  });

  const initialValues = {
    name: '',
    password: '',
    email: '',
    address: '',
    phoneNumber: '',
  };

  const handleRoleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRoles((prevRoles) => [...prevRoles, value]);
    } else {
      setSelectedRoles((prevRoles) => prevRoles.filter((role) => role !== value));
    }
  };

  return (
    <Box m="20px" >
      <Header title="Admin" subtitle="Admin Details" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}

      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              display="grid"
              gap="30px"
              p={10}
              gridTemplateColumns="repeat(5, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 5",
                },
                backgroundColor: "#F6F6F8",
                boxShadow: "0 2px 4px rgba(238, 242, 250,1)",
                width: "74%",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="name"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
              <TextField
                fullWidth
                variant="standard"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                fullWidth
                variant="standard"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                variant="standard"
                type="tel"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />



    
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Installer')}
                    onChange={handleRoleChange}
                    value="Installer"
                  />
                }
                label="Installer"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Company')}
                    onChange={handleRoleChange}
                    value="Company"
                  />
                }
                label="Company"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Customer')}
                    onChange={handleRoleChange}
                    value="Customer"
                  />
                }
                label="Customer"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Service')}
                    onChange={handleRoleChange}
                    value="Service"
                  />
                }
                label="Service"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Material')}
                    onChange={handleRoleChange}
                    value="Material"
                  />
                }
                label="Material"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Labor')}
                    onChange={handleRoleChange}
                    value="Labor"
                  />
                }
                label="Labor"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Payments')}
                    onChange={handleRoleChange}
                    value="Payments"
                  />
                }
                label="Payments"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Booking')}
                    onChange={handleRoleChange}
                    value="Booking"
                  />
                }
                label="Booking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Helpdesk')}
                    onChange={handleRoleChange}
                    value="Helpdesk"
                  />
                }
                label="Help Desk"
              />
                <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRoles.includes('Scheduler')}
                    onChange={handleRoleChange}
                    value="Scheduler"
                  />
                }
                label="Task Scheduler"
              />
              <Box display="flex" mt="20px">
                <Button type="submit"
                  color="success"
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                  variant="outlined">
                  Save Admin Details
                </Button>
              </Box>

            </Box>

          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AdminForm;
