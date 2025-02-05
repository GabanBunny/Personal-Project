import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Chart as ChartJS, registerables } from "chart.js";
import streamingPlugin from "@robloche/chartjs-plugin-streaming";
import "chartjs-adapter-date-fns";
import ChartDataLabels from "chartjs-plugin-datalabels";
import throttle from "lodash/throttle";

ChartJS.register(...registerables, streamingPlugin, ChartDataLabels);

const BarChartComponent = ({ inputData }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const updateBarChart = (chart) => {
    if (inputData) {
      const newData = inputData.map((element) => ({
        x: new Date(element.timestamp).getTime(),
        y: element.attack_id,
      }));

      const existingData = chart.data.datasets[0].data;

      // Set for quick look up like HashSet
      const existingDataSet = new Set(
        existingData.map((point) => `${point.x},${point.y}`)
      );

      // Filter unique data
      const newUniqueData = newData.filter(
        (newPoint) => !existingDataSet.has(`${newPoint.x},${newPoint.y}`)
      );

      if (newUniqueData.length > 0) {
        chart.data.datasets[0].data.push(...newUniqueData);
      }

      // Remove old data
      const maxDataPoints = 50;
      if (chart.data.datasets[0].data.length > maxDataPoints) {
        chart.data.datasets[0].data.splice(-maxDataPoints);
      }
      chart.data.datasets[0].data = chart.data.datasets[0].data.filter(
        (point) => point && point.x !== undefined && point.y !== undefined
      );

      if (!chart._destroyed && chartInstanceRef.current) {
        chart.update("quiet");
      }
    }
  };

  // function call every 500ms => reduce server load
  const throttledUpdateBarChart = throttle(updateBarChart, 500);

  useEffect(() => {
    if (chartInstanceRef.current) {
      throttledUpdateBarChart(chartInstanceRef.current);
    }
  }, [inputData]);

  useEffect(() => {
    chartInstanceRef.current = new ChartJS(canvasRef.current.getContext("2d"), {
      type: "bar",
      data: {
        datasets: [
          {
            label: "Attack ID",
            backgroundColor: "rgba(240, 0, 0, 1)",
            borderColor: "rgba(248,215,218, 1)",
            borderWidth: 1,
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: false,
        },
        scales: {
          x: {
            type: "realtime",
            realtime: {
              duration: 30000,
              refresh: 10000,
              delay: 1000,
              onRefresh: (chart) => {
                throttledUpdateBarChart(chart);
              },
            },
          },
          y: {
            beginAtZero: true,
            max: 9,
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current.notifyPlugins("destroy");
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    };
  }, []); // Empty dependency to ensure it only runs once

  return <canvas ref={canvasRef} id="barChart" />;
};

BarChartComponent.propTypes = {
  inputData: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      attack_id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BarChartComponent;
