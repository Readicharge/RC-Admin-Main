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
    Grid,
} from "@tremor/react";
import { dashboardInstallerCard_data } from "../../../data/ApiController.js";
import GeographyChart_02 from "../../../components/Geographychart_02.jsx";

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
    "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
];

const InstallerTopCard = () => {
    const [installerData, setInstallerData] = useState({
        avgExperience: "0 years",
        geographicalDistribution: {},
        profileCompletionRate: "0%",
        totalActiveInstallers: 0,
        totalInstallers: 0,
        totalVerifiedInstallers: 0,
        todayStats: {
            bookedInstallersToday: 0,
            parkedInstallersToday: 0,
        },
    });

    const [formState, setFormState] = useState(
        states.map((state) => ({ state, count: 0 }))
    );

    useEffect(() => {
        const fetchData = async () => {
            const installerCardData = await dashboardInstallerCard_data();
            console.log(installerCardData);

            setInstallerData(installerCardData.data);

            const updatedFormState = formState.map((formStateItem) => {
                const count = installerCardData.data.geographicalDistribution[formStateItem.state] || 0;
                return { state: formStateItem.state, count };
            });

            setFormState(updatedFormState);
        };

        fetchData();
    }, []);

    const { avgExperience, profileCompletionRate, totalActiveInstallers, totalInstallers, totalVerifiedInstallers, todayStats } = installerData;

    return (
        <div className=" w-full p-10">
            <div className="flex flex-row w-[70vw]  gap-x-8">
                <Card className="space-y-4">
                    <Text>Average Installer Experience</Text>
                    <Metric>{avgExperience}</Metric>
                    <ProgressBar
                        value={parseFloat(avgExperience)}
                        label={`${avgExperience}`}
                        tooltip="Average experience in years"
                        color="green"
                    />
                </Card>

                <Card className="space-y-4">
                    <Text>Profile Completion Rate</Text>
                    <Metric>{profileCompletionRate}</Metric>
                    <ProgressBar
                        value={parseFloat(profileCompletionRate)}
                        label={`${profileCompletionRate}`}
                        tooltip="Percentage of profile completion"
                        color="blue"
                    />
                </Card>

                <Card>
                    <Text>Total Installers</Text>
                    <Metric>{totalInstallers}</Metric>
                    <Flex justifyContent="between" className="mt-2">
                        <Text>Total Active Installers</Text>
                        <BadgeDelta deltaType="increase">{totalActiveInstallers}</BadgeDelta>
                    </Flex>
                    <Flex justifyContent="between" className="mt-2">
                        <Text>Total Verified Installers</Text>
                        <BadgeDelta deltaType="increase">{totalVerifiedInstallers}</BadgeDelta>
                    </Flex>
                </Card>

                <Card>
                    <Text>Today's Stats</Text>
                    <List>
                        <ListItem>
                            <Flex justifyContent="between">
                                <Text>Booked Installers</Text>
                                <Metric>{todayStats.bookedInstallersToday}</Metric>
                            </Flex>
                        </ListItem>
                        <ListItem>
                            <Flex justifyContent="between">
                                <Text>Under Process Installers</Text>
                                <Metric>{todayStats.parkedInstallersToday}</Metric>
                            </Flex>
                        </ListItem>
                    </List>
                </Card>
            </div>
            <div className="mt-6">
                <Text>Geographical Distribution</Text>
                <GeographyChart_02 data={formState} />
            </div>
        </div>
    );
};

export default InstallerTopCard;
