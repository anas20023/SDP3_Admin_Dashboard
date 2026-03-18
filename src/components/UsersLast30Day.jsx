import { useState, useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
const UsersLast30Day = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isXs = windowWidth < 480;
    const isMd = windowWidth < 768;
    const isLessThan1440 = windowWidth <= 1440;

    return (
        <>
            <p className='font-semibold text-slate-800 text-center py-2'>User registrations in Last 30 Days</p>
            <div className="w-full h-75 sm:h-87.5 lg:h-100">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        title='Users in Last 30 Days'
                        data={data}
                        margin={{ top: 20, right: 10, left: 0, bottom: isLessThan1440 ? 70 : 30 }}
                    >
                        <defs>
                            <linearGradient id="colorCc" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 4" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="display_date" 
                            angle={isLessThan1440 ? -45 : 0} 
                            textAnchor={isLessThan1440 ? "end" : "middle"} 
                            interval={isXs ? Math.ceil(data.length / 6) : isMd ? Math.ceil(data.length / 8) : isLessThan1440 ? Math.ceil(data.length / 10) : Math.ceil(data.length / 15)}
                            height={isLessThan1440 ? 70 : 40}
                            style={{ fontSize: isXs ? '10px' : isMd ? '11px' : '13px' }}
                            tick={{ fill: '#64748b' }}
                        />
                        <YAxis allowDecimals={false} tick={{ fill: '#64748b' }} stroke="none" />
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
                        <Area
                            type="monotone"
                            dataKey="cc"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorCc)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default UsersLast30Day
