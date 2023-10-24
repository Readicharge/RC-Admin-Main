import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getserviceList, createMaterial, getMaterialList, getServiceNameById , getServiceCodeById} from '../../data/ApiController.js';
import MaterialsList from './materailList';

const Material = () => {
  const materailList = ["Wire_4_4_25",
    "Wire_4_4_50",
    "Wire_4_4_75",
    "Wire_4_4_100",
    "Wire_3_4_25",
    "Wire_3_4_50",
    "Wire_3_4_75",
    "Wire_3_4_100",
    "Panel_Load_Center_60A",
    "Panel_Load_Central_80_100_A",
    "NMEA_14_50_outlet"];
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState('');
  const [numberOfInstalls, setNumberOfInstalls] = useState('');
  const [material, setMaterial] = useState([]);

  useEffect(() => {
    fetchMaterial();
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


  const fetchMaterial = async () => {
    const data = await getMaterialList();
    const temp_data = []

    for (let i = 0; i < data.data.length; i++) {
      const dataObject = data.data[i];

      let data_to_be_pushed = {
        id: dataObject._id,
        shown_id: `RC-MAT-${dataObject._id}`,
        service_code: dataObject.service_code,
        material_name: dataObject.material_name,
        material_desc: dataObject.material_desc,
        price: dataObject.price,
        number_of_chargers: dataObject.number_of_chargers
      }
      temp_data.push(data_to_be_pushed);

    }
    setMaterial(temp_data);

  };





  const handleSubmitMaterial = async(event) => {
    event.preventDefault();
    const service_code = await getServiceCodeById(selectedService)

    const materailName = event.target.materailName.value;
    const materialDesc = event.target.materialDesc.value;
    const numberOfInstall = event.target.numberOfInstall.value;
    const price = event.target.price.value;
    const newMaterial = {
      material_name: materailName,
      material_desc: materialDesc,
      number_of_chargers: numberOfInstall,
      price: price,
      material_code: `${selectedMaterials}_I_${numberOfInstall}_${service_code}`,
      service_code: service_code,
    };
    console.log(newMaterial)
    createMaterial(newMaterial);
    fetchMaterial();

  };

  return (
    <div >
      <form onSubmit={handleSubmitMaterial}>
        <Grid spacing={2}>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl sx={{ marginLeft: "20px", minWidth: "120px" }}>
                <InputLabel id="service-select-label">Service</InputLabel>
                <Select
                  labelId="service-select-label"
                  id="service-select"
                  value={selectedService._id}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setSelectedService(event.target.value);
                  }}
                  label="Service"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#000", // Adjust the color when the input is focused
                    },
                  }}
                >
                  {serviceList.map((service) => (
                    <MenuItem key={service._id} value={service._id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


              <FormControl sx={{ marginLeft: "20px", minWidth: "120px" }}>
                <InputLabel id="service-select-label">RC Material</InputLabel>
                <Select
                  labelId="service-select-label"
                  id="service-select"
                  value={selectedMaterials}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setSelectedMaterials(event.target.value);
                  }}
                  label="RC Material Code"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#000", // Adjust the color when the input is focused
                    },
                  }}
                >
                  {materailList.map((material) => (
                    <MenuItem key={material} value={material}>
                      {material}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="materailName"
                name="materailName"
                label="Material Name"
                sx={{ marginLeft: '20px' }}
              />
              <TextField
                id="materialDesc"
                name="materialDesc"
                label="Material Description"
                sx={{ marginLeft: '20px' }}
              />
              <TextField
                id="numberOfInstall"
                name="numberOfInstall"
                label="Number of Installs"
                value={numberOfInstalls}
                onChange={(event) => setNumberOfInstalls(event.target.value)}
                sx={{ marginLeft: '20px' }}
              />
              <TextField
                id="price"
                name="price"
                label="Price"
                sx={{ marginLeft: '20px' }}
              />
              <Button type="submit" variant="contained" sx={{ marginLeft: '20px' }}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <MaterialsList material={material} setMaterial={setMaterial} />
    </div>
  )
};
export default Material;
