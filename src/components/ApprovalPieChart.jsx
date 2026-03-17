import {
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { PieChart, Pie, Cell } from "recharts";
const ApprovalPieChart = ({ data }) => {
    const COLORS = ["#facc15", "#22c55e", "#ef4444"];
    return (
        <>
            <p className="font-semibold text-slate-800 text-center py-2">
                Suggestions  analysis
            </p>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label={({ name, percent }) =>
                            `${name.charAt(0).toUpperCase() + name.slice(1)} ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {(data).map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default ApprovalPieChart
