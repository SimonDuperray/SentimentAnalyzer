import { 
   BarChart,
   CartesianGrid,
   XAxis, YAxis,
   Tooltip, Legend,
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
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKeyBar} fill="#8884d8" />
         </BarChart>
      </div>
   );
};

export default PieChartComp;