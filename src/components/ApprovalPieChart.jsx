import { useState, useEffect } from 'react';
import {
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { PieChart, Pie, Cell } from "recharts";
const ApprovalPieChart = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isXs = windowWidth < 480;
    const isMd = windowWidth < 768;
    const COLORS = ["#facc15", "#22c55e", "#ef4444"];
    return (
        <>
            <p className="font-semibold text-slate-800 text-center py-2">
                Suggestions  analysis
            </p>
            <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={isXs ? "70%" : isMd ? "80%" : "70%"}
                            innerRadius={isXs ? "40%" : isMd ? "45%" : "0%"}
                            paddingAngle={isMd ? 5 : 0}
                            label={({ name, percent }) =>
                                !isMd && name ? `${name.charAt(0).toUpperCase() + name.slice(1)} ${(percent * 100).toFixed(0)}%` : ""
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
                        {/* {isMobile && <Legend verticalAlign="bottom" height={36}/>} */}
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default ApprovalPieChart
