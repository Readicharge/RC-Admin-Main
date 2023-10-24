import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from 'react-stripe-elements';
import Axios from 'axios';

const CostDetails = ({ }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('/api/create-stripe-token', {
        cardNumber: cardDetails.cardNumber,
        cardExpiry: cardDetails.cardExpiry,
        cardCvc: cardDetails.cardCvc,
      });

      // Handle the response from the server if needed
      console.log(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const handleCardInputChange = (element) => {
    setCardDetails((prevState) => ({
      ...prevState,
      [element.elementType]: element.value,
    }));
  };

  return (
    <Box>
      <Typography variant="h4" my={2}>
        Cost Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Labor Cost, Customer Cost, Material Cost */}
          {/* ... */}
          {/* Credit Card Form */}
          <Grid item xs={12}>
            <CardNumberElement onChange={handleCardInputChange} />
          </Grid>
          <Grid item xs={6}>
            <CardExpiryElement onChange={handleCardInputChange} />
          </Grid>
          <Grid item xs={6}>
            <CardCvcElement onChange={handleCardInputChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CostDetails;
