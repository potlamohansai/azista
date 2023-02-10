import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./home.css";
import "chart.js/auto";

//function to check whether the value is Prime or not ->return "true" or "false"
const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

//main component
const Home = () => {
  const [data, setData] = useState([{ a: 5 }, { b: 3 }, { c: 1 }]);

  //Increment function
  const Increment = (index, key) => {
    let newData = [...data];
    newData[index][key]++;
    console.log(newData);
    setData(newData);
  };

  //Decrement function
  const Decrement = (index, key) => {
    let newData = [...data];
    if (newData[index][key] === 0) {
      newData[index][key] = 0;
    } else {
      newData[index][key]--;
    }
    console.log(newData);
    setData(newData);
  };

  //state to toggle the chart show and hide
  const [displayChart, setDisplayChart] = useState(false);

  //Data Object which stores the labels and datasets to display bar-chart
  const chartView = {
    labels: data.map((item) => Object.keys(item)[0]),
    datasets: [
      {
        label: "Count",
        data: data.map((item) => item[Object.keys(item)[0]]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  //   const options = {
  //     responsive: false,
  //     maintainAspectRatio: false,
  //     height: 400,
  //     width: 600,
  //   };

  return (
    <div>
      {/* Data div */}
      <div>
        {data.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          return (
            <div className="home" key={index}>
              <div className="key_style">{key}</div>
              <div
                style={{
                  backgroundColor: isPrime(value)
                    ? "rgb(8, 60, 215)"
                    : "rgb(245, 195, 12)",
                  color: value ? "white" : "black",
                }}
                className="value_style"
              >
                {value ? value : "Zero"}
              </div>
              <button
                className="button_style"
                onClick={() => Increment(index, key)}
              >
                +
              </button>
              <button
                className="button_style"
                onClick={() => Decrement(index, key)}
              >
                -
              </button>
            </div>
          );
        })}
      </div>

      {/* Chart Div */}
      <div className="chart_main">
        <button
          className="chart_button"
          onClick={() => setDisplayChart(!displayChart)}
        >
          Show Chart
        </button>
        <div className="chart_view">
          {displayChart && <Bar data={chartView} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
