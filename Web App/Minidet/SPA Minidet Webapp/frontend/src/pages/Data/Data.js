import React, { useEffect } from "react";
import BarChartComponent from "./BarChart";
import PieChartComponent from "./PieChart";
import AnomalyCountChart from "./AnomalyCountChart";
import TableComponent from "./TableComponent/Table";
import "./data.css";

function DataPage() {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    const endpoint = `/api/data/chart`;
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const dataResponse = await response.json();
        setData(dataResponse);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
    // Empty dependency to ensure it only runs once
  }, []);
  return (
    <div className="wrap">
      <div className="content">
        <h1>Dashboard</h1>
        <div id="chartContainer">
          <div id="barChartContainer">
            <BarChartComponent inputData={data} />
          </div>
          <div id="pieChartContainer">
            <PieChartComponent inputData={data} />
          </div>
          <div id="anomalyCountContainer">
            <AnomalyCountChart DataPage={true} />
          </div>
        </div>
        <TableComponent />
      </div>
    </div>
  );
}

export default DataPage;
