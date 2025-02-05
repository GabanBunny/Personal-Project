import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import streamingPlugin from "@robloche/chartjs-plugin-streaming";
import "chartjs-adapter-date-fns";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(...registerables, streamingPlugin, ChartDataLabels);

const PieChartComponent = ({ inputData }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  useEffect(() => {
    //Create chart
    chartInstanceRef.current = new ChartJS(canvasRef.current.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8 ", "9"],
        datasets: [
          {
            backgroundColor: [
              "rgba(255, 99, 132, 1)", // Color for label "0"
              "rgba(54, 162, 235, 1)", // Color for label "2"
              "rgba(255, 206, 86, 1)", // Color for label "3"
              "rgba(75, 192, 192, 1)", // Color for label "4"
              "rgba(153, 102, 255, 1)", // Color for label "5"
              "rgba(255, 159, 64, 1)", // Color for label "6"
              "rgba(201, 203, 207, 1)", // Color for label "7"
              "rgba(46, 204, 113, 1)", // Color for label "8"
              "rgba(241, 196, 15, 1)", // Color for label "9"
            ],
            borderColor: "rgba(248,215,218, 1)",
            borderWidth: 1,
            data: Array(10).fill(0),
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        plugins: {
          datalabels: {
            color: "#fff",
            font: {
              size: 10,
            },
            formatter: (value, context) => {
              let percentage =
                (
                  (value /
                    context.chart._metasets[context.datasetIndex].total) *
                  100
                ).toFixed(2) + "%";
              return percentage;
            },
          },
        },
      },
    });

    // Pass as a call back instead of const interval = setInterval(updatePieChart(chartInstanceRef), 500);
    // () => will delay the running of a function until EVENT
    return () => {
      chartInstanceRef.current.notifyPlugins("destroy");
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    };
  }, []); // Empty dependency to ensure it only runs once

  //Update Pie Chart
  const updatePieChart = () => {
    const attack_count = Array(10).fill(0);
    if (inputData != null) {
      inputData.forEach((element) => {
        if (element.attack_id >= 0 && element.attack_id < 10) {
          attack_count[element.attack_id]++;
        }
      });
      //Take count
      chartInstanceRef.current.data.datasets[0].data = attack_count;
      chartInstanceRef.current.update("quiet");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => updatePieChart(), 1500);
    return () => clearInterval(interval);
  }, [inputData]);

  return <canvas ref={canvasRef} id="pieChart" />;
};
export default PieChartComponent;
