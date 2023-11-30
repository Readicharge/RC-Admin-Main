import InstallerTopCard from "./graphs/installerTopCard";
import CustomerCardCard from "./graphs/customerTopCard";
import CompanyTopCard from "./graphs/companyTopCard";

import { Card, Flex, Metric, Text, List, ListItem, ProgressBar, BadgeDelta, CategoryBar, Legend, Grid, Title, Bold, BarList } from "@tremor/react";

import { Box } from "@mui/material";
import { DonutChartUsageExample2 } from "./graphs/jobs";


const Dashboard = () => {

  return (
    <Box style={{ display: "flex", padding: "20px" }}>
      <Box style={{ width: "90%" }}>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6 p-4">
          <InstallerTopCard />
          <CustomerCardCard />
          <CompanyTopCard />
        </Grid>

        <Grid numItemsSm={2} numItemsLg={3} className="gap-6 p-4 flex">
          <DonutChartUsageExample2 />
          <Card className="w-[32%]">
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

          <Card className="w-[32%] p-4 gap-y-2" decoration="top" decorationColor="green">
            <Text>   <Bold>Background Check</Bold>   </Text>
            <Text>   <Bold>Mongo DataBase</Bold></Text>
            <Text>   <Bold>Stripe</Bold></Text>
            <Text>   <Bold>Autel</Bold></Text>
            <Text>   <Bold>Customer Service</Bold></Text>
          </Card>

        </Grid>
      </Box>
    </Box>
  )
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
