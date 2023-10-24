import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';

const ResidenceForm = () => {
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    r_1: '',  // for when is your residence built
    r_1a: '', // for electric panel upgraded in last 10 years
    r_2: '',  // for own this residence
    r_2a: '', // proceed with NMEA 14-50 for portability
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any further actions here, such as submitting the data to a server.
    console.log(formData);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Typography variant="h2" className="mb-4">
        Tell us about your residence.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleFormChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleFormChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                label="State"
                name="state"
                value={formData.state}
                onChange={handleFormChange}
              >
                <MenuItem value="state1">State 1</MenuItem>
                <MenuItem value="state2">State 2</MenuItem>
                {/* Add other states as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="ZIP"
              value={formData.zip}
              onChange={handleFormChange}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="When was your residence built?"
              type="number"
              name="residenceBuilt"
              value={formData.r_1}
              onChange={handleFormChange}
              variant="outlined"
              inputProps={{ min: 1900, max: new Date().getFullYear() }}
            />
          </Grid>
          {/* Conditionally render question 1a if any year pre-1990 is selected */}
          {formData.residenceBuilt && parseInt(formData.residenceBuilt) < 1990 && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="electrical-panel-label">
                  Since your home was built prior to 1990, has the electrical panel been upgraded in the last 10 years?
                </InputLabel>
                <Select
                  labelId="electrical-panel-label"
                  label="Since your home was built prior to 1990, has the electrical panel been upgraded in the last 10 years?"
                  name="electricalPanelUpgraded"
                  value={formData.r_1a}
                  onChange={handleFormChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="residence-status-label">Do you rent or own your residence?</InputLabel>
              <Select
                labelId="residence-status-label"
                label="Do you rent or own your residence?"
                name="residenceStatus"
                value={formData.r_2}
                onChange={handleFormChange}
              >
                <MenuItem value="Own">Own</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Conditionally render question 2a based on the answer to question 2 */}
          {formData.residenceStatus === 'Rent' && (
            <Grid item xs={12}>
              {/* You may need to implement a modal here for the NEMA 14-50 options */}
              <FormControl fullWidth variant="outlined">
                <InputLabel id="nema-14-50-label">Do you want to proceed with the NEMA 14-50 for portability?</InputLabel>
                <Select
                  labelId="nema-14-50-label"
                  label="Do you want to proceed with the NEMA 14-50 for portability?"
                  name="nema14_50Proceed"
                  value={formData.r_2a}
                  onChange={handleFormChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className="py-3">
              Proceed Further
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>

  );
};

export default ResidenceForm;
