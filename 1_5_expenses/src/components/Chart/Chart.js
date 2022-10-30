import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  console.log("chartProps", props);
  const dataPoinValue = props.dataPoints.map((item) => item.value);
  const totalMaximun = Math.max(...dataPoinValue);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          value={dataPoint.value}
          maxValue={totalMaximun}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
