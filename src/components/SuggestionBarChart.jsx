import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SuggestionBarChart = ({ data }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Aggregate raw data by uploaded_by
    const aggregated = data.reduce((acc, item) => {
        const user = item.uploaded_by;
        if (!acc[user]) {
            acc[user] = {
                uploaded_by: user,
                uploads: 0,
                totalStars: 0,
            };
        }
        acc[user].uploads += 1;
        acc[user].totalStars += item.stars;
        return acc;
    }, {});

    const chartData = Object.values(aggregated).sort((a, b) => (b.uploads - a.uploads));
    return (
        <>
            <p className="font-semibold text-slate-800 text-center py-2">
                Top Suggestion Uploading Users
            </p>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: isMobile ? 60 : 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="uploaded_by" 
                            angle={isMobile ? -45 : 0} 
                            textAnchor={isMobile ? "end" : "middle"} 
                            interval={isMobile ? 0 : "preserveEnd"}
                            height={isMobile ? 70 : 40}
                            style={{ fontSize: isMobile ? '11px' : '13px', fontWeight: isMobile ? 400 : 500 }}
                        />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" allowDecimals={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" allowDecimals={false} />
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
                            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        />
                        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                        <Bar yAxisId="left" dataKey="uploads" fill="#8884d8" name="Uploads" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="totalStars" fill="#82ca9d" name="Total Stars" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default SuggestionBarChart;