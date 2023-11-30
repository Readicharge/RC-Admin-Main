import { Card, DonutChart, Title } from "@tremor/react";
import React from "react";
import { useEffect } from "react";
import { dashboardJobMainCard_data } from "../../../data/ApiController.js";



const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;



export const DonutChartUsageExample2 = () => {
  const [value, setValue] = React.useState(null);
  const [dataMode, setDataMode] = React.useState("day"); // default to day
  const [data, setData] = React.useState({
    day: {
      BI: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      II: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      AI: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      AI80: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
    },
    week: {
      BI: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      II: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      AI: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      AI80: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
    },
    month: {
      BI: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      II: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      AI: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      AI80: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
    },
    year: {
      BI: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      II: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      AI: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
      AI80: {
        totalJobs: 0,
        totalPaidJobs: 0,
      },
    },
  });


  useEffect(() => {
    const getData = async () => {
      const odata = await dashboardJobMainCard_data();
      console.log(odata)
      setData(odata.data);
    }
    getData();
  }, [])


  const getDataForMode = () => data[dataMode];

  const handleChangeMode = (mode) => {
    setDataMode(mode);
    setValue(null); // Reset value when switching mode
  };



  const customTooltip = ({ }) => {


    if (!value) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background py-4 px-8 shadow-tremor-dropdown border border-tremor-border">

        <div className="w-full space-y-4">
          <div className="flex items-center justify-between space-x-8 bg-gray-100 rounded">
            <p className="text-center text-bold font-large ">
              {value.serviceName}
            </p>
          </div>
          <div className="flex items-center justify-between space-x-8">
            <p className="text-right text-tremor-content whitespace-nowrap">
              Total Jobs :
            </p>
            <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
              {value.totalJobs}
            </p>
          </div>
          <div className="flex items-center justify-between space-x-8">
            <p className="text-right text-tremor-content whitespace-nowrap">
              Active jobs
            </p>
            <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
              {value.totalPaidJobs}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (

    <Card className="w-[32%]">
      <Title>Jobs</Title>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`focus:outline-none ${dataMode === "day" ? "text-white bg-green-600 rounded p-1" : "text-gray-500"
            }`}
          onClick={() => handleChangeMode("day")}
        >
          Day
        </button>
        <button
          className={`focus:outline-none ${dataMode === "week" ? "text-white bg-green-600 rounded p-1" : "text-gray-500"
            }`}
          onClick={() => handleChangeMode("week")}
        >
          Week
        </button>
        <button
          className={`focus:outline-none ${dataMode === "month" ? "text-white bg-green-600 rounded p-1" : "text-gray-500"
            }`}
          onClick={() => handleChangeMode("month")}
        >
          Month
        </button>
        <button
          className={`focus:outline-none ${dataMode === "year" ? "text-white bg-green-600 rounded p-1" : "text-gray-500"
            }`}
          onClick={() => handleChangeMode("year")}
        >
          Year
        </button>
      </div>

      <DonutChart
        className="mt-6"
        data={Object.values(getDataForMode())}
        category="totalJobs"
        showLabel={true}
        index={(cityData) => cityData.totalJobs.toString()}
        colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
        onValueChange={(v) => setValue(v)}
        customTooltip={customTooltip}
      />

    </Card>

  );
};
