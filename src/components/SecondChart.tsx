import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

interface IProps {
   width: number;
   height: number;
   dataKey: string;
   isAnimationActive: boolean;
   data: any;
   cx: number;
   cy: number;
   outerRadius: number;
   fill: string
};

interface IState {
   chartData: Object;
}

const SecondChart = ({
   width, height,
   dataKey, isAnimationActive,
   data, cx, cy, outerRadius, fill
}: IProps) => {
   return (
      <div>
         <PieChart width={width} height={height}>
            <Pie 
               dataKey={dataKey}
               isAnimationActive={isAnimationActive}
               data={data}
               cx={cx}
               cy={cy}
               outerRadius={outerRadius}
               fill={fill}
               label
            />
            <Tooltip />
         </PieChart>
      </div>
   );
}

export default SecondChart;