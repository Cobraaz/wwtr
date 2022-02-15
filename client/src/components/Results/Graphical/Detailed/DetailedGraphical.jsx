import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DetailedGraphical({ detailedResult, optionValue, optionName }) {
  const barColor = ["#DC3545", "#FFC107", "#0DCAF0", "#198754"];

  const parametersGraph = detailedResult.map((dResult) => ({
    labels: dResult.parametersType.map(
      (updateLabel) =>
        new Array(37 - updateLabel.length + 1).join(" ") + updateLabel
    ),
    datasets: dResult.detailedData.optionName
      .map((opName) => opName.parameters)
      .map(
        (result, index) =>
          optionValue.includes(index) && {
            label: result[0].opName,
            data: result.map((re) => re.weightedScore),
            backgroundColor: barColor[index],
            borderColor: "#fff",
            barThickness: 15,
            borderRadius: 10,
          }
      )
      .filter((ob) => ob.label),
  }));
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          // drawOnChartArea: false,
        },
        // title: {
        //   display: true,
        //   text: "Weighted Score",
        //   color: "#911",
        //   font: {
        //     family: "Times",
        //     size: 20,
        //     weight: "bold",
        //     lineHeight: 1.2,
        //   },
        //   // padding: { top: 20, left: 0, right: 0, bottom: 0 },
        // },
        max: 4,
        min: 0,
        ticks: {
          stepSize: 0.5,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          borderColor: "#495057",
          borderWidth: 3,
          lineWidth: 2,
          color: "#495057",
          // display: false,
          // drawBorder: false,
        },
        // title: {
        //   display: true,
        //   text: "Parameters Evaluation",
        //   color: "#03a9f4",
        //   font: {
        //     family: "Times",
        //     size: 20,
        //     weight: "bold",
        //     lineHeight: 1.2,
        //   },
        //   padding: { top: 30, left: 0, right: 0, bottom: 0 },
        // },
        ticks: {
          font: {
            size: 14,
            weight: "bold",
            lineHeight: 2.5,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          textAlign: "left",
          align: "end",
          font: {
            size: 14,
            weight: "bold",
            lineHeight: 2.5,
          },
        },
      },
      // title: {
      //   display: true,
      //   text: "Parameters Evaluation",
      //   position: "top",
      //   align: "start",
      //   color: "#03a9f4",
      //   font: {
      //     size: 18,
      //     weight: "bold",
      //     lineHeight: 2.5,
      //   },
      // },
    },
  };
  return (
    <>
      {parametersGraph.map((data, index) => (
        <div key={index}>
          {data.labels.length ? (
            <>
              <div className="mt-5 mb-5">
                <span style={{ color: "#03a9f4", fontWeight: "bold" }}>
                  {detailedResult[index].name}
                </span>
                <Bar
                  options={options}
                  data={data}
                  // width="100px"
                  height={`${
                    data.labels.length === 1
                      ? data.labels.length * 30
                      : data.labels.length * optionName.length * 5
                  }px`}
                />
              </div>
              <hr />
            </>
          ) : (
            <div>{null}</div>
          )}
        </div>
      ))}
    </>
  );
}

export default DetailedGraphical;
