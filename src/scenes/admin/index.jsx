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
    const formData = new FormData();
    formData.append('image', selectedImage); // Append the image file to the FormData
    for (const key in adminData) {
      formData.append(key, adminData[key]);
    }
    createAdmin(formData); // Assuming createAdmin accepts FormData
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };


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
    <Box m="20px">
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
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 2' },
              }}
              bgcolor="#f5f5f5"
              borderRadius="10px"
              padding="20px"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            >
              <TextField
                fullWidth
                variant="filled"
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
                variant="filled"
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
                variant="filled"
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
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <Box>
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

              </Box>
            </Box>
            <Box display="flex" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Save Admin Details
              </Button>
            </Box>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="image-input"
              onChange={handleImageChange}
            />
            <label htmlFor="image-input">
              <Button component="span" variant="contained" color="primary">
                Upload Image
              </Button>
            </label>
            {selectedImage && <span>{selectedImage.name}</span>}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AdminForm;
