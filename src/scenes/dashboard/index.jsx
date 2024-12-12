import { useState } from "react";
import InstallerTopCard from "./graphs/installerTopCard";
import CustomerCardCard from "./graphs/customerTopCard";
import CompanyTopCard from "./graphs/companyTopCard";
import { Card, Flex, Grid, Text, Title, Bold, BarList } from "@tremor/react";
import { Box, Tabs, Tab } from "@mui/material";
import ComprehensiveJobDashboard from "./graphs/jobs";
import TransactionAnalyticsCard from "./graphs/transactionAnalysis";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box style={{ display: "flex", padding: "20px" }}>
      <Box style={{ width: "90%" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
          sx={{
            "& .MuiTab-root": {
              color: "white", // Default text color
              textTransform: "none", // Keeps the text as is (no uppercase)
            },
            "& .Mui-selected": {
              color: "green", // Text color for the selected tab
              fontWeight: "bold", // Boldens the selected tab text
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#96d232", // Indicator line color
            },
          }}
        >
          <Tab label="Installers" />
          <Tab label="Customers" />
          <Tab label="Payments" />
          <Tab label="Bookings" />
        </Tabs>

        {/* Tab Panels */}
        <Box className="p-4">
          {activeTab === 0 && (
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
              <InstallerTopCard />
            </Grid>
          )}
          {activeTab === 1 && (
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
              <CustomerCardCard />
            </Grid>
          )}
          {/* {activeTab === 2 && (
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
              <CompanyTopCard />
            </Grid>
          )} */}
          {activeTab === 2 && (
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6 flex">
              <TransactionAnalyticsCard />
            </Grid>
          )}
          {activeTab === 3 && (
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6 flex">
              <ComprehensiveJobDashboard />
              {/* <Card className="w-[32%]">
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
                <Text>
                  <Bold>Background Check</Bold>
                </Text>
                <Text>
                  <Bold>Mongo Database</Bold>
                </Text>
                <Text>
                  <Bold>Stripe</Bold>
                </Text>
                <Text>
                  <Bold>Autel</Bold>
                </Text>
                <Text>
                  <Bold>Customer Service</Bold>
                </Text>
              </Card> */}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

const data = [
  { name: "Transferred", value: 456, href: "#" },
  { name: "Pending", value: 351, href: "#" },
  { name: "Cancelled", value: 271, href: "#" },
  { name: "Refunded", value: 191, href: "#" },
  { name: "Profits", value: 391, href: "#" },
];
