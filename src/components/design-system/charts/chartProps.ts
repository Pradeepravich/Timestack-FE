import { ApexOptions } from "apexcharts";
import { TASKS_BY_CATEGORY } from "../../../utils/constants";

export type DonutChartOnClickFunc = (label: string, index: number) => void;
export const donutChartOptions: (
  onClick: DonutChartOnClickFunc
) => ApexOptions = (onClick) => ({
  chart: {
    events: {
      dataPointSelection: (_, __, config) => {
        onClick(
          config.w.config.labels[config.dataPointIndex],
          config.dataPointIndex
        );
      },
    },
  },
  legend: {
    show: false,
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      filter: {
        type: "none",
      },
    },
  },
  plotOptions: {
    pie: {
      customScale: 0.8,
      donut: {
        size: "80%",
      },
      dataLabels: {
        offset: 25,
        minAngleToShowLabel: 5,
      },
    },
  },
  stroke: {
    width: 0,
  },
  dataLabels: {
    enabled: false,
    formatter: (value: any) => {
      // console.log("value",value)
      // console.log("opts",opts)
      const percent = value.toFixed(1);
      return `${percent}%`;
    },
    style: {
      fontSize: "12px",
      fontWeight: "bold",
    },
    dropShadow: {
      enabled: false,
    },
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (value: any, opts) => {
        const total = opts?.globals?.series.reduce(
          (acc: any, curr: any) => acc + curr,
          0
        );
        const percent = ((value / total) * 100).toFixed(1);
        return `${percent}%`;
      },
      // formatter: (value: number) => value.toString(),
    },
  },
  colors: TASKS_BY_CATEGORY.map((s) => s.color),
  labels: TASKS_BY_CATEGORY.map((s) => s.value),
});
