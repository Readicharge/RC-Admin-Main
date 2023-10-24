
import React from "react";
import { useState } from "react";

const Booking_Application_Form = () => {

    // Address section 
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    // User End Section 
    const [installer, setInstaller] = useState('');
    const [customer, setCustomer] = useState('');

    // Number of Charger
    const [numberOfChargers, setNumberOfChargers] = useState('');


    // Charger Details 
    const [chargerDetails, setChargerDetails] = useState([]);

    // Material Details 
    const [materialList, setMaterialList] = useState([]);

    
    // Question Set 
    const [questionSet,setQuestionSet] = useState([]);


    






}


export default Booking_Application_Form;