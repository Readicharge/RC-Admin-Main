import React, { useEffect, useState } from "react";
import {
    Card,
    Flex,
    Metric,
    Text,
    List,
    ListItem,
    ProgressBar,
    BadgeDelta,
    CategoryBar,
    Legend,
} from "@tremor/react";
import { dashboardCustomerCard_data } from "../../../data/ApiController.js";
import GeographyChart_02 from "../../../components/Geographychart_02.jsx";

const states = [
    "AL", "AK", "AZ", "AR", "CA",
    "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO",
    "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH",
    "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT",
    "VA", "WA", "WV", "WI", "WY"
];
const statesMap = [
    { key: "AL", value: "Alabama" },
    { key: "AK", value: "Alaska" },
    { key: "AZ", value: "Arizona" },
    { key: "AR", value: "Arkansas" },
    { key: "CA", value: "California" },
    { key: "CO", value: "Colorado" },
    { key: "CT", value: "Connecticut" },
    { key: "DE", value: "Delaware" },
    { key: "FL", value: "Florida" },
    { key: "GA", value: "Georgia" },
    { key: "HI", value: "Hawaii" },
    { key: "ID", value: "Idaho" },
    { key: "IL", value: "Illinois" },
    { key: "IN", value: "Indiana" },
    { key: "IA", value: "Iowa" },
    { key: "KS", value: "Kansas" },
    { key: "KY", value: "Kentucky" },
    { key: "LA", value: "Louisiana" },
    { key: "ME", value: "Maine" },
    { key: "MD", value: "Maryland" },
    { key: "MA", value: "Massachusetts" },
    { key: "MI", value: "Michigan" },
    { key: "MN", value: "Minnesota" },
    { key: "MS", value: "Mississippi" },
    { key: "MO", value: "Missouri" },
    { key: "MT", value: "Montana" },
    { key: "NE", value: "Nebraska" },
    { key: "NV", value: "Nevada" },
    { key: "NH", value: "New Hampshire" },
    { key: "NJ", value: "New Jersey" },
    { key: "NM", value: "New Mexico" },
    { key: "NY", value: "New York" },
    { key: "NC", value: "North Carolina" },
    { key: "ND", value: "North Dakota" },
    { key: "OH", value: "Ohio" },
    { key: "OK", value: "Oklahoma" },
    { key: "OR", value: "Oregon" },
    { key: "PA", value: "Pennsylvania" },
    { key: "RI", value: "Rhode Island" },
    { key: "SC", value: "South Carolina" },
    { key: "SD", value: "South Dakota" },
    { key: "TN", value: "Tennessee" },
    { key: "TX", value: "Texas" },
    { key: "UT", value: "Utah" },
    { key: "VT", value: "Vermont" },
    { key: "VA", value: "Virginia" },
    { key: "WA", value: "Washington" },
    { key: "WV", value: "West Virginia" },
    { key: "WI", value: "Wisconsin" },
    { key: "WY", value: "Wyoming" }
];



const CustomerTopCard = () => {
    const [customerData, setCustomerData] = useState({
        totalCustomers: 0,
        registeredCustomers: 0,
        loggedInCustomers: 0,
        geographicalDistribution: {},
    });

    const [formState, setFormState] = useState(
        states.map((state) => ({ state, count: 0 }))
    );

    useEffect(() => {
        const fetchData = async () => {
            const customerCardData = await dashboardCustomerCard_data();
            console.log(customerCardData);

            setCustomerData(customerCardData.data);

            const updatedFormState = formState.map((formStateItem) => {
                // Get the count from geographicalDistribution, default to 0 if not found
                const count = customerCardData.data.geographicalDistribution[formStateItem.state] || 0;

                // Find the full state name from statesMap based on the abbreviation (key)
                const state = statesMap.find(stateObj => stateObj.key === formStateItem.state)?.value || "Unknown";

                return { state, count };
            });


            setFormState(updatedFormState);
        };

        fetchData();
    }, []);

    const { totalCustomers, registeredCustomers, loggedInCustomers } = customerData;

    const subCategoryValues = [
        Math.floor((registeredCustomers / totalCustomers) * 100),
        Math.floor((loggedInCustomers / totalCustomers) * 100),
        Math.floor(
            100 -
            ((registeredCustomers / totalCustomers) * 100 + (loggedInCustomers / totalCustomers) * 100)
        ),
    ];

    const subCategoryColors = ["green", "blue", "red"];
    const subCategoryTitles = ["Registered", "Logged In", "Inactive"];

    return (
        <div className="w-full p-10">
            <div className="flex flex-row w-[70vw] gap-x-8">
                <Card className="space-y-4">
                    <Text>Total Customers</Text>
                    <Metric>{totalCustomers}</Metric>
                    <ProgressBar
                        value={100}
                        label={`${totalCustomers}`}
                        tooltip="Total number of customers"
                        color="blue"
                    />
                </Card>

                <Card className="space-y-4">
                    <Text>Customers who booked min 1 job</Text>
                    <Metric>{registeredCustomers}</Metric>
                    <ProgressBar
                        value={(registeredCustomers / totalCustomers) * 100}
                        label={`${Math.floor((registeredCustomers / totalCustomers) * 100)}%`}
                        tooltip="Percentage of registered customers"
                        color="green"
                    />
                </Card>

                <Card>
                    <Text>Logged In Customers</Text>
                    <Metric>{loggedInCustomers}</Metric>
                    <Flex justifyContent="between" className="mt-2">
                        <Text>Active Customers</Text>
                        <BadgeDelta deltaType="increase">{registeredCustomers}</BadgeDelta>
                    </Flex>
                </Card>
            </div>
            <div className="mt-6">
                <Text>Geographical Distribution</Text>
                <GeographyChart_02 data={formState} />
            </div>

        </div>
    );
};

export default CustomerTopCard;
