import React, { useEffect, useState } from "react";
import { Card, Title, DonutChart, BarChart, AreaChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text, Metric, Flex, ProgressBar, Legend } from "@tremor/react";
import { dashboardJobMainCard_data } from "../../../data/ApiController.js";
import { GridSeparatorIcon } from "@mui/x-data-grid";
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



const ComprehensiveJobDashboard = () => {
  const [dataMode, setDataMode] = useState("day");
  const [data, setData] = useState(null);
  const [formState, setFormState] = useState(
    states.map((state) => ({ state, count: 0 }))
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dashboardJobMainCard_data();
        setData(response.data);
        console.log(response.data)
        const updatedFormState = formState.map((formStateItem) => {
          const count = data[dataMode].stateWiseCount[formStateItem.state] || 0;
          return { state: formStateItem.state, count };
        });
        setFormState(updatedFormState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dataMode]);

  if (!data) return <div>Loading...</div>;



  const currentData = data[dataMode];

  const serviceData = Object.entries(currentData.serviceWiseCount)
    .filter(([key, value]) => value && value.serviceName && value.totalJobs !== undefined && value.totalPaidJobs !== undefined)
    .map(([key, value]) => ({
      name: value.serviceName,
      totalJobs: value.totalJobs,
      paidJobs: value.totalPaidJobs,
    }));




  console.log(serviceData);


  const jobStatusData = [
    { name: "Upcoming ", value: currentData.liveJobs },
    { name: "Active ", value: currentData.activeJobs },
    { name: "Completed", value: currentData.completedJobs },
    { name: "Cancelled", value: currentData.cancelledJobs },
    { name: "Modified ", value: currentData.modifiedJobs }
  ];

  const stageWiseData = [
    { name: "Installer has arrived", value: currentData.stageWiseCount.stage_0 },
    { name: "Installer has started working", value: currentData.stageWiseCount.stage_1 },
    { name: "Overall Completion", value: currentData.stageWiseCount.overall_completion }
  ];

  const seasonalTrendsData = [
    { name: "Spring", value: currentData.seasonalTrends.spring },
    { name: "Summer", value: currentData.seasonalTrends.summer },
    { name: "Fall", value: currentData.seasonalTrends.fall },
    { name: "Winter", value: currentData.seasonalTrends.winter }
  ];

  return (
    <div className="p-4 space-y-6">
      <Flex justifyContent="between" alignItems="center">
        <Title>ReadiCharge Bookings</Title>
        <Flex justifyContent="end" className="space-x-2">
          {["day", "week", "month", "year"].map((mode) => (
            <button
              key={mode}
              className={`px-3 py-1 rounded ${dataMode === mode ? "bg-[#96d232] text-[#06061e] scale-[1.05] transition-300" : " bg-[#96d232]/80 shadow-md text-[#06061e]/40"
                }`}
              onClick={() => setDataMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </Flex>
      </Flex>
      <Card className="flex flex-row items-center">
        <Title>Jobs by Service</Title>
        <DonutChart
          data={serviceData}
          category="totalJobs"
          showLabel={true}
          colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
          valueFormatter={(value) => {
            console.log(value);
            return `${value} jobs`;
          }}
          className="mt-6"
        />
        <Legend
          categories={['Advanced 80 Installaton (AI80)', 'Advanced Installation (AI)', 'Intermidiate Installation (II)', 'Basic Installaton (BI)']}
          colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
          className="max-w-xs mt-8"
        />
      </Card>
      <div className="flex flex-row gap-6">
        <Card>
          <Title>Job Status Overview</Title>
          <BarChart
            data={jobStatusData}
            index="name"
            categories={["value"]}
            colors={['blue']}
            valueFormatter={(value) => `${value} jobs`}
            yAxisWidth={48}
            className="mt-6"
          />
        </Card>

        <Card>
          <Title>Stage-wise Job Count</Title>
          <BarChart
            data={stageWiseData}
            index="name"
            categories={["value"]}
            colors={["green"]}
            valueFormatter={(value) => `${value} jobs`}
            yAxisWidth={48}
            className="mt-6"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Title>Financial Overview</Title>

          <Text color="green" className="mt-4">Incoming</Text>
          <Flex className="mx-2">
            <Text >Total Bookings Cost</Text>
            <Text >${currentData.totalCustomerCost?.toFixed(2)}</Text>
          </Flex>
          <Flex className="mt-2 mx-2">
            <Text >Total Insurance Cost</Text>
            <Text >${currentData.totalInsuranceCost?.toFixed(2)}</Text>
          </Flex>
          <Text color="red" className="mt-2">Outgoing</Text>
          <Flex className="mx-2 ">
            <Text >Total Material Cost Paid</Text>
            <Text >${currentData.totalMaterialCost?.toFixed(2)}</Text>
          </Flex>
          <Flex className="mt-2 mx-2">
            <Text >Total Labor Cost Paid</Text>
            <Text >${currentData.totalInstallerPaidCost?.toFixed(2)}</Text>
          </Flex>
          <Text color="green" className="mt-2 text-lg">Total Remaining balance: ${parseFloat(currentData.totalPaidAmount?.toFixed(2)) - (parseFloat(currentData.totalMaterialCost?.toFixed(2)) + parseFloat(currentData.totalInstallerPaidCost?.toFixed(2)))}</Text>
        </Card>

        <Card>
          <Title>Average Costs</Title>
          <Flex className="mt-4">
            <Text>Avg. Customer Cost (without Insurance)</Text>
            <Text>${currentData.averageCustomerCost?.toFixed(2)}</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Customer Cost (with Insurance)</Text>
            <Text>${currentData.averageCustomerCostWithInsurance?.toFixed(2)}</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Insurance Cost</Text>
            <Text>${currentData.averageInsuranceCost?.toFixed(2)}</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Installer Cost</Text>
            <Text>${currentData.averageInstallerCost?.toFixed(2)}</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Material Cost</Text>
            <Text>${currentData.averageMaterialCost?.toFixed(2)}</Text>
          </Flex>


        </Card>

        <Card>
          <Title>Customer Metrics</Title>
          <Flex className="mt-4">
            <Text>Avg. Rating</Text>
            <Text>{currentData.averageRating?.toFixed(2)}</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Customer Retention</Text>
            <Text>{currentData.customerRetentionRate?.toFixed(2)}%</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Jobs per Customer</Text>
            <Text>{currentData.averageJobsPerCustomer?.toFixed(2)}</Text>
          </Flex>
        </Card>

        <Card>
          <Title>Operational Metrics</Title>
          <Flex className="mt-4">
            <Text>Job Completion Rate</Text>
            <Text>{currentData.jobCompletionRate?.toFixed(2)}%</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Job Duration</Text>
            <Text>{(currentData.averageJobDuration / 3600000)?.toFixed(2)} hours</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Latency Time</Text>
            <Text>{(currentData.averageResponseTime / 3600000)?.toFixed(2)} hours</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Installer Retention</Text>
            <Text>{currentData.averageInstallerRetention?.toFixed(2)}%</Text>
          </Flex>
          <Flex className="mt-2">
            <Text>Avg. Jobs per Installer</Text>
            <Text>{currentData.averageJobsPerInstaller?.toFixed(2)}</Text>
          </Flex>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Title>Seasonal Trends</Title>
          <AreaChart
            data={seasonalTrendsData}
            index="name"
            categories={["value"]}
            colors={["cyan"]}
            valueFormatter={(value) => `${value} jobs`}
            yAxisWidth={48}
            className="mt-6 h-72"
          />
        </Card>

        <Card>
          <Title>Top Performing Installers</Title>
          <Table className="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Installer ID</TableHeaderCell>
                <TableHeaderCell>Total Jobs</TableHeaderCell>
                <TableHeaderCell>Average Rating</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.topPerformingInstallers.map((installer, index) => (
                <TableRow key={index}>
                  <TableCell>{installer.id}</TableCell>
                  <TableCell>{installer.jobs}</TableCell>
                  <TableCell>{installer.averageRating.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card>
          <Title>Customer Satisfaction by Service</Title>
          <Table className="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Service</TableHeaderCell>
                <TableHeaderCell>Average Rating</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(currentData.customerSatisfactionByService).map(([serviceId, rating]) => (
                <TableRow key={serviceId}>
                  <TableCell>{serviceId}</TableCell>
                  <TableCell>{rating.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card>
          <Title>Insurance Metrics</Title>
          <div className="mt-6">
            <Flex>
              <Text>Insured Jobs</Text>
              <Text>{currentData.insuredJobs}</Text>
            </Flex>
            <ProgressBar value={currentData.insuredJobs / currentData.totalJobs * 100} className="mt-2" />
            <Flex className="mt-4">
              <Text>Uninsured Jobs</Text>
              <Text>{currentData.uninsuredJobs}</Text>
            </Flex>
            <ProgressBar value={currentData.uninsuredJobs / currentData.totalJobs * 100} className="mt-2" />
            <Flex className="mt-4">
              <Text>Cancelled Insured Jobs</Text>
              <Text>{currentData.cancelledInsuredJobs}</Text>
            </Flex>
          </div>
        </Card>

      </div>



      <Card>
        <Title>Most Popular Vehicle Makes</Title>
        <BarChart
          data={Object.entries(currentData.mostPopularVehicleMakes).map(([make, count]) => ({ make, count }))}
          index="make"
          categories={["count"]}
          colors={["indigo"]}
          valueFormatter={(value) => `${value} vehicles`}
          yAxisWidth={48}
          className="mt-6"
        />
      </Card>

      <Card>
        <Title>Most Common Charger Types</Title>
        <BarChart
          data={Object.entries(currentData.mostCommonChargerTypes).map(([type, count]) => ({ type, count }))}
          index="type"
          categories={["count"]}
          colors={["rose"]}
          valueFormatter={(value) => `${value} chargers`}
          yAxisWidth={48}
          className="mt-6"
        />
      </Card>

      <Card>
        <Title>Peak Booking Times</Title>
        <BarChart
          data={Object.entries(currentData.peakBookingTimes).map(([hour, count]) => ({ hour: `${hour}:00`, count }))}
          index="hour"
          categories={["count"]}
          colors={["amber"]}
          valueFormatter={(value) => `${value} bookings`}
          yAxisWidth={48}
          className="mt-6"
        />
      </Card>
      <GeographyChart_02 data={formState} />

    </div>
  );
};

export default ComprehensiveJobDashboard;

