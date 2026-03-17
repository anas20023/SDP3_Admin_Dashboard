import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { PieChart, Pie, Cell } from "recharts";
const Analytics = () => {
    const [data, setData] = useState({
        userAnalytics: [],
        suggestionAnalysis: []
    });
    const COLORS = ["#facc15", "#22c55e", "#ef4444"];
    // pending, approved, rejected
    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/manage/analytics`,
                    { withCredentials: true }
                );
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAnalysis();
    }, []);
    console.log(data.suggestionAnalysis)
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-base-200 gap-2">
            <div className="col-span-4 bg-white px-1 py-4 rounded">
                <p className='font-semibold text-slate-800 text-center py-2'>User registrations in Last 30 Days</p>
                <div >
                    <ResponsiveContainer width="100%" height="200" minWidth={400}>
                        <AreaChart
                            title='Users in Last 30 Days'
                            data={data.userAnalytics}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 4" />
                            <XAxis dataKey="display_date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="cc"
                                stroke="#8884d8"
                                fill="#8884d8"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="col-span-2 bg-white px-1 py-4 rounded">
                <p className='font-semibold text-slate-800 text-center py-2'>Suggestion uploads in Last 30 Days</p>
            </div>
            <div className="col-span-2 bg-white px-1 py-4 rounded">
                <p className="font-semibold text-slate-800 text-center py-2">
                    Suggestions Analysis
                </p>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data.suggestionAnalysis}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label={({ name, percent }) =>
                                `${name.charAt(0).toUpperCase() + name.slice(1)} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {(data.suggestionAnalysis).map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;