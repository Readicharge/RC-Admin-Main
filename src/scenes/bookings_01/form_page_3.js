import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Typography,
    Grid
} from '@mui/material';
import ChargingStationForm from './form_page_4';

const ChargerDetails1Form = ({ numberOfChargers = 2, residence_form_data }) => {
    const [formData, setFormData] = useState({

        // Charger Details :Type
        cd1_1: '',  // Do you already purchase this charger
        cd1_1a: '',    // Did you purchase a NMEA or a Hardwire charger
        cd1_1b: '',    // What type of NMEA charger
        cd1_1c: '', // If HardWired id your charger 80A
        cd1_2: '',     // what is the make and model of the charger
        // Charger Details :Location 
        cd2_1: '', // High voltage outlet like to use
        cd2_2: '', // If yes to cd2_1 then what type pf high voltage outlet 
        cd2_2a: '', // if cd2_1 value less than 14_50 outlet then want to upgrade your outlet
        cd2_3: '', // Installation type preference
        cd2_3a: '', // type of hard wire charger want to intall 
        cd2_4: '', // where do you want your charger to be installed 
        cd2_5: '', // is your garage, carport, pole barn, or out-building attached to your home
        cd2_5a: '', // Do you have an electrical panel in your detached garage, carport, pole barn, out-building
        cd2_5b: '', // Where is your electrical panel located
        cd2_5c: '', //Is the electrical panel on the same floor as your detached garage, carport, pole barn, out-building
        cd2_5d: '', // Is the electrical panel two or more floors above your detached garage, carport, pole barn, out-building
        cd2_5e: '', // Because there is no electrical panel at your installation location, are you ok with having your charger installed on the exterior of your home
        cd2_6: '', //What is the finish of your interior wall at the installation location
        cd2_6a: '', // What is the finish of your exterior wall at the installation location
        cd2_7: '', // What is the construction of the material inside the wall at the installation location
        cd2_8: '', // Where is your electrical panel located
        cd2_8a: '', //Is the electrical panel on the same floor as your attached garage, carport, pole barn, out-building
        cd2_8b: '', //Is the electrical panel two or more floors above your attached garage, carport, pole barn, out-building
        cd2_9: '', //Is your electrical panel recessed into the wall
        cd2_10: '', //What type of electrical panel do you have
        cd2_11: '', //Are there at least two open spaces for breakers
        cd2_12: '', //What brand of breaker panel do you have
        cd2_13: '', //What is the size of the main electrical breaker
        cd2_13a: '', //Does this electrical panel have any circuits using it for power
        cd2_13b: '', //Do you have central air, electric stove, or electric hot water heater running off of this electrical panel
        cd2_14: '', //  What is the approximate distance between the charger installation location and your electrical panel
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
        <div>

            <div className="p-4 bg-white rounded-lg shadow-md mb-4">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id={`charger-purchased-label-`}>
                                    Did you already purchase Charger?
                                </InputLabel>
                                <Select
                                    labelId={`charger-purchased-label-`}
                                    label={`Did you already purchase Charger?`}
                                    name={`cd1_1`}
                                    value={formData[`cd1_1`]} // Convert boolean to string
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value='true'>Yes</MenuItem>
                                    <MenuItem value='false'>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {formData[`cd1_1`] === "false" && (
                            <Grid item xs={12}>
                                <Typography variant="body1" gutterBottom>
                                    Since you have not purchased this charger yet, fill the details for the other chargers (if any) and proceed to the charger location details section.
                                </Typography>
                            </Grid>
                        )}

                        {formData[`cd1_1`] === "true" && (
                            <>
                                <Grid item xs={3} md={3}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id={`charger-type-label-`}>
                                            Did you purchase a NEMA or hardwired charger for Charger?
                                        </InputLabel>
                                        <Select
                                            labelId={`charger-type-label-`}
                                            label={`Did you purchase a NEMA or hardwired charger for Charger?`}
                                            name={`cd1_1a`}
                                            value={formData[`cd1_1a`]}
                                            onChange={handleFormChange}
                                        >
                                            <MenuItem value="NEMA">NEMA</MenuItem>
                                            <MenuItem value="Hardwired">Hardwired</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {formData[`cd1_1a`] === 'NEMA' && (
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel id={`nema-type-label-`}>
                                                If NEMA, what type charger did you purchase for Charger?
                                            </InputLabel>
                                            <Select
                                                labelId={`nema-type-label-`}
                                                label={`If NEMA, what type charger did you purchase for Charger?`}
                                                name={`cd1_1b`}
                                                value={formData[`cd1_1b`]}
                                                onChange={handleFormChange}
                                            >
                                                <MenuItem value="14-50">14-50</MenuItem>
                                                <MenuItem value="10-30">10-30</MenuItem>
                                                <MenuItem value="6-50">6-50</MenuItem>
                                                <MenuItem value="6-30">6-30</MenuItem>
                                                <MenuItem value="6-20">6-20</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )}

                                {formData[`cd1_1a`] === 'Hardwired' && (
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel id={`charger-is-80-amp-label-`}>
                                                Is your charger for Charger 80 Amp?
                                            </InputLabel>
                                            <Select
                                                labelId={`charger-is-80-amp-label-`}
                                                label={`Is your charger for Charger 80 Amp?`}
                                                name={`cd1_1c`}
                                                value={formData[`cd1_1c`]}
                                                onChange={handleFormChange}
                                            >
                                                <MenuItem value="Yes">Yes</MenuItem>
                                                <MenuItem value="No">No</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )}
                            </>
                        )}

                        {formData[`cd1_1`] === "true" && (
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label={`Make & Model of the charger for Charger`}
                                    name={`cd1_2`}
                                    value={formData[`cd1_2`]}
                                    onChange={handleFormChange}
                                    variant="outlined"
                                />
                            </Grid>
                        )}
                    </Grid>



                    {/* Charger Details :Location  */}
                    <FormControl fullWidth variant="outlined" className="mb-4">
                        <InputLabel>
                            Do you have an existing high voltage (240v) outlet you would like to use?
                        </InputLabel>
                        <Select
                            label="Do you have an existing high voltage (240v) outlet you would like to use?"
                            name="cd2_1"
                            value={formData['cd2_1'] || ''}
                            onChange={handleFormChange}
                        >
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </Select>
                    </FormControl>

                    {formData['cd2_1'] === 'true' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>
                                If yes, what type of high voltage outlet is installed
                            </InputLabel>
                            <Select
                                label="If yes, what type of high voltage outlet is installed"
                                name="cd2_2"
                                value={formData['cd2_2'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="NEMA 14-50">NEMA 14-50</MenuItem>
                                <MenuItem value="NEMA 10-30"> NEMA 10-30</MenuItem>
                                <MenuItem value="NEMA 6-50"> NEMA 6-50</MenuItem>
                                <MenuItem value="NEMA 6-30">NEMA 6-30</MenuItem>
                                <MenuItem value="NEMA 6-20">NEMA 6-20</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_1'] === 'false' && formData['cd2_2'] === 'NEMA 14-50' && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                You Need to first purchase the charger !!
                            </Typography>
                        </>
                    )}

                    {formData['cd2_1'] === 'true' && formData['cd2_2'] === 'NEMA 14-50' && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                You are all Set !! Get Charging !!
                            </Typography>
                        </>
                    )}

                    {formData['cd2_2'] !== 'NEMA 14-50' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>
                                Because you have less than a 14-50 outlet, would you like to upgrade your high voltage outlet ?
                            </InputLabel>
                            <Select
                                label="Because you have less than a 14-50 outlet, would you like to upgrade your high voltage outlet?"
                                name="cd2_2a"
                                value={formData['cd2_2a'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="true">Yes</MenuItem>
                                <MenuItem value="false">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_1'] === 'false' &&
                        formData['cd2_2a'] === 'true' &&
                        formData['cd1_1c'] !== 'true' && (
                            <>
                                <Typography variant="body1" gutterBottom>
                                    ReadiCharge does not offer NEMA 6-20 / 6-30 / 6-50 / 10-30 chargers at this time. If you still want to contact an installer, click here to see a list of referrals” (referral list)
                                </Typography>
                            </>
                        )}

                    {formData['cd2_1'] !== 'true' &&
                        formData['cd2_2a'] !== 'true' &&
                        formData['cd1_1c'] !== 'true' && (
                            <FormControl fullWidth variant="outlined" className="mb-4">
                                <InputLabel>What is your installation type preference?</InputLabel>
                                <Select
                                    label="What is your installation type preference?"
                                    name="cd2_3"
                                    value={formData['cd2_3'] || ''}
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value="Hardwired">Hardwired</MenuItem>
                                    <MenuItem value="NEMA 14-50 Outlet">NEMA 14-50 Outlet</MenuItem>
                                </Select>
                            </FormControl>
                        )}

                    {formData['cd2_3'] === 'Hardwired' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>What type of hardwired charger do you want installed</InputLabel>
                            <Select
                                label="What type of hardwired charger do you want installed"
                                name="cd2_3a"
                                value={formData['cd2_3a'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="50A - 12kw">50A - 12kw</MenuItem>
                                <MenuItem value="80A - 19.2kw">80A - 19.2kw</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_3'] === 'NEMA 14-50 Outlet' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Where do you want your charger installed?</InputLabel>
                            <Select
                                label="Where do you want your charger installed?"
                                name="cd2_4"
                                value={formData['cd2_4'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="Inside garage/carport">Inside garage/carport</MenuItem>
                                <MenuItem value="Inside pole barn or out-building">Inside pole barn or out-building</MenuItem>
                                <MenuItem value="Outside wall of home">Outside wall of home</MenuItem>
                                <MenuItem value="Outside wall of garage/carport">Outside wall of garage/carport</MenuItem>
                                <MenuItem value="Outside wall of pole barn or out-building">Outside wall of pole barn or out-building</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <FormControl fullWidth variant="outlined" className="mb-4">
                        <InputLabel>Is your garage, carport, pole barn, or out-building attached to your home</InputLabel>
                        <Select
                            label="Is your garage, carport, pole barn, or out-building attached to your home"
                            name="cd2_5"
                            value={formData['cd2_5'] || ''}
                            onChange={handleFormChange}
                        >
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </Select>
                    </FormControl>

                    {formData['cd2_5'] === 'false' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Do you have an electrical panel in your detached garage, carport, pole barn, out-building?</InputLabel>
                            <Select
                                label="Do you have an electrical panel in your detached garage, carport, pole barn, out-building?"
                                name="cd2_5a"
                                value={formData['cd2_5a'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="true">Yes</MenuItem>
                                <MenuItem value="false">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_5'] === 'true' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Where is your electrical panel located?</InputLabel>
                            <Select
                                label="Where is your electrical panel located?"
                                name="cd2_5b"
                                value={formData['cd2_5b'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="inside">Inside my detached garage, carport, pole barn, out-building</MenuItem>
                                <MenuItem value="outside">On an outside wall</MenuItem>
                                <MenuItem value="basement">In the basement</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_5b'] === 'inside' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Is the electrical panel on the same floor as your detached garage, carport, pole barn, out-building?</InputLabel>
                            <Select
                                label="Is the electrical panel on the same floor as your detached garage, carport, pole barn, out-building?"
                                name="cd2_5c"
                                value={formData['cd2_5c'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_5c'] === 'no' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Is the electrical panel two or more floors above your detached garage, carport, pole barn, out-building? (if “No” on Q5c)</InputLabel>
                            <Select
                                label="Is the electrical panel two or more floors above your detached garage, carport, pole barn, out-building? (if “No” on Q5c)"
                                name="cd2_5d"
                                value={formData['cd2_5d'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_5'] === 'false' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Because there is no electrical panel at your installation location, are you ok with having your charger installed on the exterior of your home?</InputLabel>
                            <Select
                                label="Because there is no electrical panel at your installation location, are you ok with having your charger installed on the exterior of your home?"
                                name="cd2_5e"
                                value={formData['cd2_5e'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(formData['cd2_5'] === 'false' || formData['cd2_5b'] === 'inside') && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>What is the finish of your interior wall at the installation location? (Only show if Q4 response is “inside”, others skip to Q6a)</InputLabel>
                            <Select
                                label="What is the finish of your interior wall at the installation location? (Only show if Q4 response is “inside”, others skip to Q6a)"
                                name="cd2_6"
                                value={formData['cd2_6'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="drywall">Drywall</MenuItem>
                                <MenuItem value="plaster">Plaster</MenuItem>
                                <MenuItem value="paneling">Paneling</MenuItem>
                                <MenuItem value="brick">Brick</MenuItem>
                                <MenuItem value="concrete">Concrete</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                                <MenuItem value="unfinished">Unfinished</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(formData['cd2_5'] === 'false' || formData['cd2_5e'] === 'yes') && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>What is the finish of your exterior wall at the installation location?</InputLabel>
                            <Select
                                label="What is the finish of your exterior wall at the installation location?"
                                name="cd2_6a"
                                value={formData['cd2_6a'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="brick">Brick</MenuItem>
                                <MenuItem value="concrete">Concrete</MenuItem>
                                <MenuItem value="aluminum_siding">Aluminum Siding</MenuItem>
                                <MenuItem value="vinyl_siding">Vinyl Siding</MenuItem>
                                <MenuItem value="wood_siding">Wood Siding</MenuItem>
                                <MenuItem value="wood">Wood</MenuItem>
                                <MenuItem value="plaster">Plaster</MenuItem>
                                <MenuItem value="metal">Metal</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_5'] === 'false' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>What is the construction of the material inside the wall at the installation location?</InputLabel>
                            <Select
                                label="What is the construction of the material inside the wall at the installation location?"
                                name="cd_7"
                                value={formData['cd_7'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="brick">Brick</MenuItem>
                                <MenuItem value="cinder_block">Cinder Block</MenuItem>
                                <MenuItem value="wood">Wood</MenuItem>
                                <MenuItem value="metal">Metal</MenuItem>
                                <MenuItem value="plaster_stucco">Plaster / Stucco</MenuItem>
                                <MenuItem value="concrete">Concrete</MenuItem>
                                <MenuItem value="dont_know">I don’t know</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_5'] === 'false' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Where is your electrical panel located?</InputLabel>
                            <Select
                                label="Where is your electrical panel located?"
                                name="cd_8"
                                value={formData['cd_8'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="inside">Inside my home</MenuItem>
                                <MenuItem value="outside">On an outside wall</MenuItem>
                                <MenuItem value="basement">In the basement</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd_8'] === 'inside' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Is the electrical panel on the same floor as your attached garage, carport, pole barn, out-building? (if “Inside my home” on Q8)</InputLabel>
                            <Select
                                label="Is the electrical panel on the same floor as your attached garage, carport, pole barn, out-building? (if “Inside my home” on Q8)"
                                name="cd_8a"
                                value={formData['cd_8a'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_8a'] === 'no' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Is the electrical panel two or more floors above your attached garage, carport, pole barn, out-building?</InputLabel>
                            <Select
                                label="Is the electrical panel two or more floors above your attached garage, carport, pole barn, out-building?"
                                name="cd2_8b"
                                value={formData['cd2_8b'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(formData['cd2_5'] === 'false' || formData['cd2_8'] === 'outside' || formData['cd2_8a'] === 'no') && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Is your electrical panel recessed into the wall?</InputLabel>
                            <Select
                                label="Is your electrical panel recessed into the wall?"
                                name="cd2_9"
                                value={formData['cd2_9'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes, it is recessed</MenuItem>
                                <MenuItem value="no">No, it is not recessed</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(formData['cd2_5'] === 'false' || formData['cd_9'] === 'yes') && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>What type of electrical panel do you have?</InputLabel>
                            <Select
                                label="What type of electrical panel do you have?"
                                name="cd2_10"
                                value={formData['cd2_10'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="breaker_panel">Breaker panel</MenuItem>
                                <MenuItem value="fuse_box">Fuse box</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(formData['cd2_5'] === 'false' || formData['cd2_10'] === 'breaker_panel') && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Are there at least two open spaces for breakers?</InputLabel>
                            <Select
                                label="Are there at least two open spaces for breakers?"
                                name="cd2_11"
                                value={formData['cd2_11'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(formData['cd2_5'] === 'false' || formData['cd2_11'] === 'yes') && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>What brand of breaker panel do you have?</InputLabel>
                            <Select
                                label="What brand of breaker panel do you have?"
                                name="cd2_12"
                                value={formData['cd2_12'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="cutler_hammer">Cutler Hammer</MenuItem>
                                <MenuItem value="eaton">Eaton</MenuItem>
                                <MenuItem value="federal_pacific">Federal Pacific</MenuItem>
                                <MenuItem value="ge">GE</MenuItem>
                                <MenuItem value="leviton">Leviton</MenuItem>
                                <MenuItem value="reliance">Reliance</MenuItem>
                                <MenuItem value="siemens">Siemens</MenuItem>
                                <MenuItem value="square_d">Square D</MenuItem>
                                <MenuItem value="sylvania">Sylvania</MenuItem>
                                <MenuItem value="wadsworth">Wadsworth</MenuItem>
                                <MenuItem value="zinsco">Zinsco</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(formData['cd2_5'] === 'false' || formData['cd2_11'] === 'yes') && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>What is the size of the main electrical breaker?</InputLabel>
                            <Select
                                label="What is the size of the main electrical breaker?"
                                name="cd2_13"
                                value={formData['cd2_13'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="60A">60A</MenuItem>
                                <MenuItem value="100A">100A</MenuItem>
                                <MenuItem value="125A">125A</MenuItem>
                                <MenuItem value="150A">150A</MenuItem>
                                <MenuItem value="200A">200A</MenuItem>
                                <MenuItem value="225A">225A</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_13'] === '60A' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Does this electrical panel have any circuits using it for power?</InputLabel>
                            <Select
                                label="Does this electrical panel have any circuits using it for power?"
                                name="cd2_13a"
                                value={formData['cd2_13a'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData['cd2_13'] === '100A' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Does this electrical panel have any circuits using it for power? (if 100A breaker)</InputLabel>
                            <Select
                                label="Does this electrical panel have any circuits using it for power? (if 100A breaker)"
                                name="cd2_13b"
                                value={formData['cd2_13b'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(formData['cd2_5'] === 'false' || formData['cd2_13a'] === 'yes' || formData['cd2_13b'] === 'yes') && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>Are there any open circuits in the electrical panel?</InputLabel>
                            <Select
                                label="Are there any open circuits in the electrical panel?"
                                name="cd2_14"
                                value={formData['cd2_14'] || ''}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                    {/* Question 14 */}
                    {formData['cd2_5'] === 'false' && (
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel>
                                What is the approximate distance between the charger installation location and your electrical panel?
                            </InputLabel>
                            <Select
                                label={`What is the approximate distance between the charger installation location and your electrical panel?`}
                                name={`cd2_14`}
                                value={formData[`cd2_14`]}
                                onChange={handleFormChange}
                            >
                                <MenuItem value='under_25'>Under 25'</MenuItem>
                                <MenuItem value='between_26_50'>Between 26-50'</MenuItem>
                                <MenuItem value='between_51_75'>Between 51-75'</MenuItem>
                                <MenuItem value='between_76_100'>Between 75-100'</MenuItem>
                                <MenuItem value='more_than_100'>More than 100’ </MenuItem>
                            </Select>
                        </FormControl>
                    )}


                    <Button type="submit" variant="contained" color="primary">
                        Submit Charger
                    </Button>
                </form>

            </div>

        </div>
    );
};

export default ChargerDetails1Form;
