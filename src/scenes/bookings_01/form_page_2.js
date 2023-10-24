import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const NumberOfChargersForm = () => {
  const [numberOfChargers, setNumberOfChargers] = useState(1);

  const handleChargersChange = (event) => {
    setNumberOfChargers(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any further actions here, such as submitting the data to a server.
    console.log(`Number of Chargers Selected: ${numberOfChargers}`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="chargers-label">How many chargers do you want?</InputLabel>
          <Select
            labelId="chargers-label"
            label="How many chargers do you want?"
            value={numberOfChargers}
            onChange={handleChargersChange}
          >
            <MenuItem value={1}>1 Charger</MenuItem>
            <MenuItem value={2}>2 Chargers</MenuItem>
            <MenuItem value={3}>3 Chargers</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NumberOfChargersForm;
