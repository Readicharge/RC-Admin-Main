import React from "react";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { BarList, Bold, Card, Flex, Metric, Text, List, ListItem, ProgressBar, BadgeDelta, CategoryBar, Legend, Grid, DonutChart, Title } from "@tremor/react";
import { getInstallerList, getCustomerData, getServicePriceList, getServiceNameById, dashboardInstallerCard_data } from "../../data/ApiController.js";
import { useEffect } from "react";
import { useState } from "react";
import { DonutChartUsageExample2 } from "./graphs/jobs.jsx"





const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;



const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;
  const categoryPayload = payload?.[0];
  if (!categoryPayload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      <div className="flex flex-1 space-x-2.5">
        {/* <div className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`} /> */}
        <div className="w-full">
          <div className="flex items-center justify-between space-x-8">
            {/* <p className="text-right text-tremor-content whitespace-nowrap">
              {categoryPayload.name}
            </p>
            <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
              {categoryPayload.id}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {

  // The Primaries
  const [totalInstaller, setTotalInstaller] = useState("");
  const [totalCustomer, setTotalCustomer] = useState("");
  const [totalActive,setTotalActive] = useState(0);
  const [totalScheduled,setTotalScheduled] = useState(0);
  const [totalTodayAvail, setTotalTodayAvail] = useState(0);
  const [serviceMap, setServiceMap] = useState({});
  const [value, setValue] = React.useState(null);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      const installerCount = await getInstallerList();
      const customerCount = await getCustomerData();

      setTotalInstaller(installerCount.data.odata.length);
      setTotalCustomer(customerCount.data.length);


      // Setting up the data for the pie chart which will keep the track for each of the installers 
      var servicesMap = {}
      const seerviceOData = async () => {
        for (let i = 0; i < installerCount.data.odata.length; i++) {
          const services = installerCount.data.odata[i].services
          for (const serviceId in services) {
            // Here we have to check if the servicesMap has the service name as the key then we will increase the counter for that service otherwise we will add the servicename as the key and the value will bet he servie name and the count of the service
            if (servicesMap[(services[serviceId])] != undefined) {
              servicesMap[services[serviceId]].count = servicesMap[services[serviceId]].count + 1;
            }
            else {
              const sName = await getServiceNameById(services[serviceId]);
              servicesMap[services[serviceId]] = {
                name: sName,
                count: 1
              }
            }
          }
        }
        setServiceMap(servicesMap);
        console.log(servicesMap)
      }
      seerviceOData()

      const installerCardData = await dashboardInstallerCard_data();
      console.log(installerCardData)

      setTotalActive(installerCardData.data.overallActiveInstallersCount);
      setTotalInstaller(installerCardData.data.overallInstallersCount);
      setTotalScheduled(installerCardData.data.bookedInstaller);
      setTotalTodayAvail(installerCardData.data.installersForToday);
      
    }
    fetchData();
  }, [])


  // Sample data
  const locationA = [
    {
      name: "Growth %",
      share: (totalInstaller / 20),
      amount: `${totalInstaller}`,

    }
  ];

  const locationB = [
    {
      name: "Growth %",
      share: (totalCustomer / 20),
      amount: `${totalCustomer}`,
    }
  ];

  const locationC = [
    {
      name: "Growth %",
      share: 45,
      amount: "255",
    },

  ];

  const categories = [
    {
      title: "Installers",
      metric: totalInstaller,
      data: locationA,
      activeCount: totalActive,
      subCategoryValues: [totalScheduled, totalTodayAvail-totalScheduled ],
      subCategroyColors: ["cyan", "green"],
      subCategoryTitles: ["Scheduled Today", "Active Today"],
    },
    {
      title: "Customers",
      metric: totalCustomer,
      data: locationB,
      activeCount: totalCustomer,
      subCategoryValues: [30, 70],
      subCategroyColors: ["yellow", "green"],
      subCategoryTitles: ["Scheduled Today", "Active Today"],
    },
    {
      title: "Companies",
      metric: "23",
      data: locationC,
      activeCount: 10,
      subCategoryValues: [30, 70],
      subCategroyColors: ["yellow", "green"],
      subCategoryTitles: ["Scheduled Today", "Active Today"],
    },

  ];


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }





  const cities = [
    {
      id: "65374fe8f735dd38a821bd38",
      name: "Basic Install",
      sales: 6,
    },
    {
      id: "65374ffdf735dd38a821bd3a",
      name: "Immidiate Install",
      sales: 8,
    },
    {
      id: "6537500ff735dd38a821bd3c",
      name: "Advance Install",
      sales: 10,
    },
    {
      id: "6537501df735dd38a821bd3e",
      name: "Advance 80 Install",
      sales: 12,
    },
  ];


  return (
    <Box style={{ display: "flex" }}>
      <Box style={{ width: "90%" }}>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6 p-4">
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
                        value={product.share}
                        label={`${product.share}%`}
                        tooltip={product.amount}
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
              />
            </Card>
          ))}
        </Grid>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6 p-4 flex">
          <DonutChartUsageExample2 />
          <Card className="max-w-lg">
            <Title>Transaction Analytics</Title>
            <Flex className="mt-4">
              <Text>
                <Bold>Source</Bold>
              </Text>
              <Text>
                <Bold>Amount</Bold>
              </Text>
            </Flex>
            <BarList data={data} className="mt-2 " />
          </Card>
        </Grid>
        <Card className="px-4 m-4 w-[97%] flex">
          <List className="w-2/3">
            {cities.map((locationData) => (
              <ListItem key={locationData.name} className="space-x-2">
                <div className="flex items-center space-x-2 truncate">
                  <span
                    className={classNames(
                      locationData.name === "Basic Install"
                        ? "bg-indigo-500"
                        : locationData.name === "Immidiate Install"
                          ? "bg-violet-500"
                          : locationData.name === "Advance Install"
                            ? "bg-fuchsia-500"
                            : locationData.name === "Advance 80 Install"
                              ? "bg-red-300"
                              : "",
                      "h-2.5 w-2.5 rounded-sm flex-shrink-0",
                    )}
                  />
                  <span className="truncate">{locationData.name}</span>
                </div>
                {/* <span>{serviceMap[locationData.id].name}</span> */}
              </ListItem>
            ))}
          </List>
          <DonutChart
            className="mt-6 px-8"
            data={cities}
            showLabel={true}
            category="sales"
            variant="pie"
            index="name"
            colors={["green", "yellow", "orange", "indigo", "blue", "emerald"]}
            onValueChange={(v) => setValue(v)}
            valueFormatter={valueFormatter}
            customTooltip={customTooltip}
          />
        </Card>
      </Box>
      <Box className="p-4" style={{position:"absolute", right:0}}>
        <Text className="text-bold text-center"> Quick Links</Text>
        <Card className="w-24 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Background Check</Text>
        </Card>
        <Card className="w-24 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Stripe</Text>
        </Card>
        <Card className="w-24 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Autel</Text>
        </Card>
        <Card className="w-24 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Customer Service</Text>
        </Card>
        <Card className="w-24 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Mongo DataBase</Text>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;



const data = [
  {
    name: "Transferred",
    value: 456,
    href: "#",

  },
  {
    name: "Pending",
    value: 351,
    href: "#",

  },
  {
    name: "Cancelled",
    value: 271,
    href: "#",

  },
  {
    name: "Refunded",
    value: 191,
    href: "#",

  },
  {
    name: "Profits",
    value: 391,
    href: "#",

  },
];  