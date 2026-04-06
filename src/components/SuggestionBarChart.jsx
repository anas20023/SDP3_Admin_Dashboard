import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SuggestionBarChart = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isXs = windowWidth < 480;
  const isMd = windowWidth < 768;
  const isLessThan1440 = windowWidth <= 1440;

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

  // Convert to array, sort by uploads desc, then totalStars desc, take top 3
  const chartData = Object.values(aggregated)
    .sort((a, b) => {
      if (a.uploads !== b.uploads) return b.uploads - a.uploads;
      return b.totalStars - a.totalStars;
    })
    .slice(0, 3);

  // Calculate max values for proper Y-axis domains
  const maxUploads = Math.max(...chartData.map((d) => d.uploads), 1);
  const maxStars = Math.max(...chartData.map((d) => d.totalStars), 1);

  // Format tick values for better readability
  const formatYAxis = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value;
  };

  return (
    <div className="card bg-base-100 shadow-md rounded-xl p-4">
      <div className="card-body p-0 sm:p-2">
        <h3 className="card-title text-lg font-semibold text-gray-800 justify-center sm:justify-start">
          Top 3 Suggestion Uploading Users
        </h3>

        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: isLessThan1440 ? 65 : 30,
              }}
              barGap={8}
              barCategoryGap={16}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="uploaded_by"
                angle={isLessThan1440 ? -35 : 0}
                textAnchor={isLessThan1440 ? 'end' : 'middle'}
                interval={0}
                height={isLessThan1440 ? 65 : 40}
                style={{ fontSize: isXs ? '10px' : isMd ? '11px' : '13px' }}
                tick={{ fill: '#64748b' }}
                dy={isLessThan1440 ? 5 : 0}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#3b82f6"
                allowDecimals={false}
                domain={[0, maxUploads + (maxUploads * 0.1)]}
                tickFormatter={formatYAxis}
                tick={{ fill: '#64748b' }}
                width={40}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#10b981"
                allowDecimals={false}
                domain={[0, maxStars + (maxStars * 0.1)]}
                tickFormatter={formatYAxis}
                tick={{ fill: '#64748b' }}
                width={40}
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
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: '20px' }}
                iconType="circle"
              />
              <Bar
                yAxisId="left"
                dataKey="uploads"
                fill="#3b82f6"
                name="Uploads"
                radius={[4, 4, 0, 0]}
                barSize={isXs ? 30 : isMd ? 40 : 50}
              />
              <Bar
                yAxisId="right"
                dataKey="totalStars"
                fill="#10b981"
                name="Total Stars"
                radius={[4, 4, 0, 0]}
                barSize={isXs ? 30 : isMd ? 40 : 50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center text-xs text-gray-500 mt-2">
          Based on suggestions uploaded in the selected period
        </div>
      </div>
    </div>
  );
};

export default SuggestionBarChart;