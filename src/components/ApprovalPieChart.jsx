import { useState, useEffect } from 'react';
import {
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { PieChart, Pie, Cell } from "recharts";
const ApprovalPieChart = ({ data }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const COLORS = ["#facc15", "#22c55e", "#ef4444"];
    return (
        <>
            <p className="font-semibold text-slate-800 text-center py-2">
                Suggestions  analysis
            </p>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={isMobile ? "80%" : "90%"}
                            innerRadius={isMobile ? "40%" : "0%"}
                            paddingAngle={isMobile ? 5 : 0}
                            label={({ name, percent }) =>
                                !isMobile ? `${name.charAt(0).toUpperCase() + name.slice(1)} ${(percent * 100).toFixed(0)}%` : ""
                            }
                        >
                            {(data).map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                borderRadius: '8px', 
                                border: 'none', 
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
                                fontSize: '12px',
                                padding: '8px 12px'
                            }}
                            itemStyle={{ padding: '2px 0' }}
                        />
                        {isMobile && <Legend verticalAlign="bottom" height={36}/>}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default ApprovalPieChart
