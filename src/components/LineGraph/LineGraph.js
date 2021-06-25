import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import './LineGraph.css';
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    x: [
      {
        ticks: {   color: '#fff',},
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },        
      },
    ],
    y: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          color: "#fff",
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({isDark ,  casesType="cases" }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className={`${isDark ? "linegraph-dark" : "linegraph-light"}`}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: isDark? "#fff" : "rgba(204, 16, 52, 0.5)",
                borderColor: "#fff",
                data: data,
                fill: true,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;