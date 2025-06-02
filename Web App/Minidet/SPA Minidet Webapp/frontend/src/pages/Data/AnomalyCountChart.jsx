import React, { useState, useEffect } from "react";

const AnomalyCountChart = ({ DataPage }) => {
  const [totalAnomalies, setTotalAnomalies] = useState(null);

  useEffect(() => {
    getData().then((count) => {
      setTotalAnomalies(count);
    });
    const interval = setInterval(
      () =>
        getData().then((count) => {
          setTotalAnomalies(count);
        }),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {DataPage ? (
        <div className="totalAnomalies">
          <div
            style={{
              fontSize: "30px",
              paddingTop: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Pending Anomalies
            <div
              style={{
                fontWeight: "bold",
                fontSize: "100px",
              }}
            >
              {totalAnomalies}
            </div>
          </div>
        </div>
      ) : (
        <div> Pending Anomalies: {totalAnomalies}</div>
      )}
    </>
  );
};

async function getData() {
  const endpoint = "/api/anomaly-count";
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return data.totalAnomalies;
    } else {
      console.log("Failed to fetch anomaly count", response.statusText);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export default AnomalyCountChart;
