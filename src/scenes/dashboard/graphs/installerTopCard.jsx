import React from "react";
import { Card, Flex, Metric, Text, List, ListItem, ProgressBar, BadgeDelta, CategoryBar, Legend, Grid } from "@tremor/react";
import { dashboardInstallerCard_data } from "../../../data/ApiController.js";
import { useEffect } from "react";
import { useState } from "react";

const InstallerTopCard = () => {

    // Declaring the Initail Values as initial null
    const [totalInstaller, setTotalInstaller] = useState("");
    const [totalActive, setTotalActive] = useState(0);
    const [totalScheduled, setTotalScheduled] = useState(0);
    const [totalTodayAvail, setTotalTodayAvail] = useState(0);


    // Fetching the details while loading the page everytime 
    useEffect(() => {
        const fetchData = async () => {
            const installerCardData = await dashboardInstallerCard_data();
            console.log(installerCardData)

            setTotalActive(installerCardData.data.overallActiveInstallersCount);
            setTotalInstaller(installerCardData.data.overallInstallersCount);
            setTotalScheduled(installerCardData.data.bookedInstaller);
            setTotalTodayAvail(installerCardData.data.installersForToday);
        }

        fetchData();
    }, [])


    // Setting the Data Skeleton 
    const installerGrowthData = [
        {
            name: "Growth %",
            TotalInstaller: (totalInstaller / 20),
            amount: `${totalInstaller}`,

        }
    ];



    const categories = [
        {
            title: "Installers",
            metric: totalInstaller,
            data: installerGrowthData,
            activeCount: totalActive,
            subCategoryValues: [
               Math.floor(totalScheduled/totalInstaller*100),
               Math.floor(totalTodayAvail/totalInstaller*100),
               Math.floor(100 -( ( totalScheduled/totalInstaller*100) + (totalTodayAvail/totalInstaller*100)))
            ],
            subCategroyColors: ["yellow", "green", "blue"],
            subCategoryTitles: ["Scheduled Today", "Active Today", "Inactive Today"],
        }]




    return (
       <>
            {categories.map((item) => (
                <Card key={item.title}>
                    <Flex alignItems="start">
                        <Text>{item.title}</Text>
                        <BadgeDelta deltaType="increase">{item.activeCount}</BadgeDelta>
                    </Flex>

                    <Metric>{item.metric}</Metric>
                    <List className="mt-4">
                        {item.data.map((product) => (
                            <ListItem key={product.name}>
                                <div className="w-full">
                                    <Text>{product.name}</Text>
                                    <ProgressBar
                                        value={product.TotalInstaller}
                                        label={`${product.TotalInstaller}%`}
                                        tooltip={product.amount}
                                        color="blue"
                                    />
                                </div>
                            </ListItem>
                        ))}
                    </List>
                    <CategoryBar
                        values={item.subCategoryValues}
                        colors={item.subCategroyColors}
                        className="mt-4"

                    />
                    <Legend
                        categories={item.subCategoryTitles}
                        colors={item.subCategroyColors}
                        className="mt-3"
                        showLabels={true}
                        tooltip={item.subCategoryTitles}
                        showAnimation= {true}
                    />
                </Card>
            ))}
        </>
    )
};

export default InstallerTopCard;
