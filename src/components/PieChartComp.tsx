import { 
   BarChart,
   CartesianGrid,
   XAxis, YAxis,
   Legend,
   Bar
 } from "recharts";

interface IProps {
   width: number;
   height: number;
   data: any;
   dataKeyXAxis: string;
   dataKeyBar: string;
};

const PieChartComp = ({
   width, height,
   data,
   dataKeyXAxis, dataKeyBar
}: IProps) => {
   return (
      <div>
         <BarChart width={width} height={height} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyXAxis} />
            <YAxis />
            <Legend />
            <Bar dataKey={dataKeyBar} fill="lightcoral" />
         </BarChart>
      </div>
   );
};

export default PieChartComp;