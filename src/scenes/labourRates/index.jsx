import React, { useState, useEffect } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import Header from '../../components/Header.jsx';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getLabourRate, createLabourRate, getserviceList } from '../../data/ApiController.js';
import PasswordModal from '../global/passwordConfirm.jsx';

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

const LabourRateForm = () => {
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [labourRatesList, setLabourRatesList] = useState([]);
  const [formState, setFormState] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchServiceList = async () => {
      const response = await getserviceList();
      if (response && response.data) {
        setServiceList(response.data);
      }
    };
    fetchServiceList();
  }, []);

  useEffect(() => {
    const createDefaultFormState = () => {
      const defaultFormState = states.map((state) => ({
        state: state,
        prices: [0, 0, 0]
      }));
      setFormState(defaultFormState);
    };

    createDefaultFormState();
  }, []);

  async function fetchData() {
    const data = await getLabourRate();
    if (data.data) {
      console.log(data.data);
      setLabourRatesList(data.data);

    }
  }

  const handleInputChange = (event, index, priceIndex) => {
    const { value } = event.target;
    const updatedFormState = [...formState];
    updatedFormState[index].prices[priceIndex] = value;
    setFormState(updatedFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Heloo")

    // Submitting the form three times
    for (let i = 0; i < 3; i++) {
      const data = {
        price_statewise: formState.map((item) => ({
          state: item.state,
          price: item.prices[i]
        })),
        number_of_installs: i + 1,
        service_id: selectedService,
      };

      await createLabourRate(data);
    }

    fetchData();
  };

  const handleRowClick = (labourRate) => {
    const updatedFormState = labourRate.price_statewise.map((correspondingItem) => {
      const correspondingState = formState.find((item) => item.state === correspondingItem.state);
      const prices = correspondingState ? correspondingState.prices : [0, 0, 0];
      return { state: correspondingItem.state, prices };
    });

    setSelectedService(labourRate.service_id);
    setFormState(updatedFormState);
  };

  const getCountBasedPadStart = (count) => {
    if (count <= 3) {
      return 1;
    } else {
      return 2;
    }
  };


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };





  const handleServiceSelect = (event) => {
    const selectedServiceId = event.target.value;
    const selectedLabourRates = labourRatesList.filter((labourRate) => labourRate.service_id === selectedServiceId);

    if (selectedLabourRates && selectedLabourRates.length > 0) {
      const updatedFormState = states.map((state) => {
        const prices = selectedLabourRates.map((labourRate) => {
          const correspondingStatePrice = labourRate.price_statewise.find((item) => item.state === state);
          return correspondingStatePrice ? correspondingStatePrice.price : 0;
        });
        return { state: state, prices: prices };
      });

      setFormState(updatedFormState);
    }

    setSelectedService(selectedServiceId);
  };


  if (!serviceList || serviceList.length === 0) {
    return <div>Sorry, you have to create Services first</div>;
  }


  return (
    <Box style={{ alignItems: "center" }}>

      <div style={{ padding: "20px" }}>
        <Header title="Labor Rates" subtitle="Manage your labor rate" />
        <Box style={{ alignContents: "space-between", justifyContent: "space-between", margin: "10px" }}>
          <FormControl sx={{ minWidth: 120, marginLeft: '20px', border: "1px solid #fff" }} >
            <InputLabel style={{ color: "#fff" }} id="service-select-label">Service</InputLabel>
            <Select
              labelId="service-select-label"
              id="service-select"
              value={selectedService}
              onChange={handleServiceSelect}
              style={{ color: "#fff" }}
            >
              {serviceList.map((service) => (
                <MenuItem key={service._id} value={service._id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Box>

        <form onSubmit={handleSubmit}>
          <Grid spacing={8}>
            <Grid item>
              <div style={{ height: '65vh', overflow: 'auto', borderRadius: "14px" }}>
                <Table>
                  <TableHead
                    style={{
                      backgroundColor: "#96D232",
                      borderTopLeftRadius: "14px",
                      borderTopLeftRadius: "14px",
                      position: "sticky"
                    }}>
                    <TableRow style={{
                      backgroundColor: "#96D232",
                      borderTopLeftRadius: "14px",
                      borderTopLeftRadius: "14px"
                    }}>
                      <TableCell style={{ fontWeight: "bold", borderTopLeftRadius: "14px", }}>State</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Price 1</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Price 2</TableCell>
                      <TableCell style={{ fontWeight: "bold", borderTopRightRadius: "14px" }}>Price 3</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{
                    borderBottomRightRadius: "14px",
                    borderBottomLeftRadius: "14px"
                  }}>
                    {formState.map((item, index) => (
                      <TableRow key={index}
                        style={{
                          backgroundColor: "#FFFFFF"
                        }}>
                        <TableCell>
                          <TextField
                            name={`price_statewise[${index}][state]`}
                            value={item.state}
                            disabled
                            fullWidth
                            variant='outlined'
                          />
                        </TableCell>
                        {item.prices.map((price, priceIndex) => (
                          <TableCell key={priceIndex}>
                            <TextField
                              name={`price_statewise[${index}][prices][${priceIndex}]`}
                              value={price}
                              onChange={(event) =>
                                handleInputChange(event, index, priceIndex)
                              }
                              fullWidth
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Grid>
            <Button variant="contained" type="submit" style={{ backgroundColor: "#96D232", padding: "17px", marginLeft: "10px", marginTop: "10px", padding: "4px", width: "200px" }} onClick={handleOpenModal}>
              Submit
            </Button>
          </Grid>
        </form>


      </div>

      {/* Add geographyChart three times */}
      {/*       <Box mt={4} display="flex" justifyContent="space-between">
      <Box width="30%">
  <Typography variant="h6" mb={2}>
    Geography Chart 1
  </Typography>
  <Paper sx={{ height: 400 }}>
    <GeographyChart data={chartData1} />
  </Paper>
</Box>
<Box width="30%">
  <Typography variant="h6" mb={2}>
    Geography Chart 2
  </Typography>
  <Paper sx={{ height: 400 }}>
    <GeographyChart data={chartData2} />
  </Paper>
</Box>
<Box width="30%">
  <Typography variant="h6" mb={2}>
    Geography Chart 3
  </Typography>
  <Paper sx={{ height: 400 }}>
    <GeographyChart data={chartData3} />
  </Paper>
</Box>

      </Box> */}
      <PasswordModal open={modalOpen} handleClose={handleCloseModal} onConfirm={handleSubmit} />
    </Box>
  );
};

export default LabourRateForm;
