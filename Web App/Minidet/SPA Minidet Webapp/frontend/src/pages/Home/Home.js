import React, { useEffect } from "react";
import AnomalyCountChart from "../Data/AnomalyCountChart";
import BarChartComponent from "../Data/BarChart";
import Location from "../../components/HeaderComponent/Location";

function Home({ location }) {
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

  let date = new Date();
  date = date.toLocaleString("en-US", {
    timeZone: location, // Specify Vietnam's time zone
  });

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "white",
        paddingBottom: "20px",
      }}
    >
      <div style={{ padding: "20px" }}>
        <div
          style={{
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AnomalyCountChart DataPage={false} />
          <div>
            {date}
            {/* {hours}:{minutes}
            {day}/{month}/{year} */}
          </div>
        </div>
        <div style={{ height: " 880px" }}>
          <BarChartComponent inputData={data} />
        </div>
      </div>
    </div>
  );
}
export default Home;
