import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik, FieldArray } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { createAdmin } from '../../data/ApiController.js';

const AdminForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const checkoutSchema = yup.object().shape({
    name: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    adminType: yup.string().required('Admin Type is required')
  });

  const initialValues = {
    name: '',
    password: '',
    email: '',
    address: '',
    phoneNumber: '',
    adminType: '',
    roles: [],
    permissions: [],
  };

  const handleFormSubmit = (values) => {
    const adminData = { ...values, roles: values.adminType === 'Static Admin' ? values.roles : [], permissions: values.adminType === 'Dynamic Admin' ? values.permissions : [] };
    createAdmin(adminData);
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
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box
              display="grid"
              gap="30px"
              p={5}
              gridTemplateColumns="repeat(2, 1fr)"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                backgroundColor: "#F6F6F8",
                boxShadow: "0 2px 4px rgba(238, 242, 250, 1)",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Username"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="tel"
                label="Phone Number"
                name="phoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Address"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel>Admin Type</InputLabel>
                <Select
                  name="adminType"
                  value={values.adminType}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("roles", []);
                    setFieldValue("permissions", []);
                  }}
                  label="Admin Type"
                >
                  <MenuItem value="Static Admin">Static Admin</MenuItem>
                  <MenuItem value="Dynamic Admin">Dynamic Admin</MenuItem>
                </Select>
              </FormControl>

              {/* Conditional fields for Static Admin roles */}
              {values.adminType === 'Static Admin' && (
                <FieldArray name="roles">
                  {() => (
                    <>
                      {['Service', 'Materials', 'Labor Rate'].map((role) => (
                        <FormControlLabel
                          key={role}
                          control={<Checkbox checked={values.roles.includes(role)} onChange={(e) => {
                            if (e.target.checked) setFieldValue('roles', [...values.roles, role]);
                            else setFieldValue('roles', values.roles.filter(r => r !== role));
                          }} />}
                          label={role}
                        />
                      ))}
                    </>
                  )}
                </FieldArray>
              )}

              {/* Conditional fields for Dynamic Admin permissions */}
              {values.adminType === 'Dynamic Admin' && (
                <FieldArray name="permissions">
                  {() => (
                    <>
                      {['Affiliate Admin', 'Support Admin', 'Inventory Admin', 'E-commerce', 'Supplier Management', 'Customer Support', 'Web Admin', 'Web Management', 'Blog Management'].map((permission) => (
                        <FormControlLabel
                          key={permission}
                          control={<Checkbox checked={values.permissions.includes(permission)} onChange={(e) => {
                            if (e.target.checked) setFieldValue('permissions', [...values.permissions, permission]);
                            else setFieldValue('permissions', values.permissions.filter(p => p !== permission));
                          }} />}
                          label={permission}
                        />
                      ))}
                    </>
                  )}
                </FieldArray>
              )}

              <Box display="flex" mt="20px" justifyContent="center">
                <Button type="submit" color="success" variant="contained">
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
