import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const UsersLast30Day = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isXs = windowWidth < 480;
  const isSm = windowWidth < 640;
  const isMd = windowWidth < 768;
  const isLg = windowWidth < 1024;
  const isLessThan1440 = windowWidth <= 1440;

  // Determine tick interval based on screen size
  const getTickInterval = () => {
    if (isXs) return Math.ceil(data.length / 6);
    if (isSm) return Math.ceil(data.length / 8);
    if (isMd) return Math.ceil(data.length / 10);
    if (isLg) return Math.ceil(data.length / 12);
    return Math.ceil(data.length / 15);
  };

  // Font size for XAxis ticks
  const getTickFontSize = () => {
    if (isXs) return '10px';
    if (isSm) return '11px';
    return '12px';
  };

  // Helper to format date labels on small screens
  const formatXAxis = (value) => {
    if (isXs || isSm) {
      // Show shorter date (e.g., "3/1" instead of "Mar 1")
      const parts = value.split(' ');
      if (parts.length >= 2) {
        return `${parts[1]}/${parts[0].slice(0, 3)}`;
      }
    }
    return value;
  };

  return (
    <div className="card bg-base-100 rounded-xl p-4">
      <div className="card-body p-0 sm:p-2">
        <h3 className="card-title text-lg font-semibold text-gray-800 justify-center sm:justify-start">
          User Registrations (Last 30 Days)
        </h3>

        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: -10,
                bottom: isLessThan1440 ? 60 : 30,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 4"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="display_date"
                tickFormatter={formatXAxis}
                angle={isLessThan1440 ? -35 : 0}
                textAnchor={isLessThan1440 ? 'end' : 'middle'}
                interval={getTickInterval()}
                height={isLessThan1440 ? 65 : 40}
                style={{ fontSize: getTickFontSize() }}
                tick={{ fill: '#64748b' }}
                dy={isLessThan1440 ? 5 : 0}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: '#64748b' }}
                stroke="none"
                width={35}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  fontSize: '12px',
                  padding: '8px 12px',
                }}
                itemStyle={{ padding: '2px 0', color: '#1e293b' }}
                labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                formatter={(value) => [`${value} users`, 'Registrations']}
              />
              <Area
                type="monotone"
                dataKey="cc"
                stroke="#3b82f6" // Tailwind blue-500
                strokeWidth={2}
                fill="#3b82f6"
                fillOpacity={0.15}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center text-xs text-gray-500 mt-2">
          Daily new user accounts
        </div>
      </div>
    </div>
  );
};

export default UsersLast30Day;