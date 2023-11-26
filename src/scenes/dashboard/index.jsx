import React from "react";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { BarList, Bold, Card, Flex, Metric, Text, List, ListItem, ProgressBar, Grid, DonutChart, Title } from "@tremor/react";
import { getInstallerList, getCustomerData, getServicePriceList } from "../../data/ApiController.js";
import { useEffect } from "react";
import { useState } from "react";





const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

const Dashboard = () => {

  // The Primaries
  const [totalInstaller, setTotalInstaller] = useState("");
  const [totalCustomer, setTotalCustomer] = useState("");
  const [value, setValue] = React.useState(null);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      const installerCount = await getInstallerList();
      const customerCount = await getCustomerData();

      setTotalInstaller(installerCount.data.odata.length);
      setTotalCustomer(customerCount.data.length)
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
    },
    {
      title: "Customers",
      metric: totalCustomer,
      data: locationB,
    },
    {
      title: "Companies",
      metric: "23",
      data: locationC,
    },

  ];


  var servicePrice = {}
  const seerviceOData = async () => {
    const data = await getServicePriceList();
  }

  seerviceOData();

  console.log(seerviceOData)

  const cities = [
    {
      name: "Basic Install",
      sales: 6,
    },
    {
      name: "Immidiate Install",
      sales: 8,
    },
    {
      name: "Advance Install",
      sales: 10,
    },
    {
      name: "Advance 80 Install",
      sales: 12,
    },
  ];


  return (
    <Box>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 p-4">
        {categories.map((item) => (
          <Card key={item.title}>
            <Text>{item.title}</Text>
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
          </Card>
        ))}
      </Grid>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 p-4 flex">
        <Card className="px-4">
          <Title>Services</Title>
          <DonutChart
            className="mt-6"
            data={cities}
            showLabel={true}
            category="sales"
            variant="pie"
            index="name"
            colors={["green", "yellow", "orange", "indigo", "blue", "emerald"]}
            onValueChange={(v) => setValue(v)}
          />
        </Card>
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
      <Grid numItemsSm={2} numItemsLg={3} className="p-4 flex">
        <Card className="w-36 p-4 m-4" decoration="top" decorationColor="green">
          <Text>ClearChecks</Text>
        </Card>
        <Card className="w-36 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Stripe</Text>
        </Card>
        <Card className="w-36 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Autel</Text>
        </Card>
        <Card className="w-36 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Customr Service</Text>
        </Card>
        <Card className="w-36 p-4 m-4" decoration="top" decorationColor="green">
          <Text>Mongo DataBase</Text>
        </Card>
      </Grid>
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