import { Bar } from "react-chartjs-2";

const OverallGraphical = ({
  overviewNumerical,
  optionValue,
  optionName,
  name,
}) => {
  const barColor = ["#DC3545", "#FFC107", "#0DCAF0", "#198754"];
  const data = {
    labels: name,
    datasets: overviewNumerical
      .map(
        (overNumerical, index) =>
          optionValue.includes(index) && {
            label: optionName[index],
            data: overNumerical.result.map((re) => re.weightedScore),
            backgroundColor: barColor[index],
            borderColor: "#fff",
            barThickness: 15,
            borderRadius: 10,
          }
      )
      .filter((ob) => ob.label),
  };
  //   const abc = overviewNumerical.map((overNumerical) => ({
  //     labels: name,
  //     datasets: overNumerical.result.map(({ weightedScore }, index) => ({
  //       label: optionName[index],
  //       data: weightedScore,
  //       backgroundColor: barColor[index],
  //       borderColor: "#fff",
  //       barThickness: 15,
  //       borderRadius: 10,
  //     })),
  //   }));
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
    <div className="mt-5 mb-5">
      <span style={{ color: "#03a9f4", fontWeight: "bold" }}>
        Parameters Evaluation
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
  );
};

export default OverallGraphical;
