import { useState, useEffect } from 'react';
import { Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const ApprovalPieChart = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isXs = windowWidth < 480;
  const isSm = windowWidth < 640;
  const isMd = windowWidth < 768;

  // Colors: amber, green, red (tailwind-like)
  const COLORS = ['#f59e0b', '#22c55e', '#ef4444'];

  // Calculate total for optional summary
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  // Custom legend renderer for better mobile display
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-3 mt-4 text-xs">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-700 capitalize">{entry.value}</span>
            <span className="text-gray-500 font-medium">
              ({((entry.payload.value / total) * 100).toFixed(0)}%)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="card bg-base-100 rounded-xl p-4">
      <div className="card-body p-0 sm:p-2">
        <h3 className="card-title text-lg font-semibold text-gray-800 justify-center sm:justify-start">
          Suggestions Analysis
        </h3>

        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={isXs ? '70%' : isSm ? '75%' : '80%'}
                innerRadius={isMd ? '45%' : '0%'}
                paddingAngle={isMd ? 3 : 0}
                label={
                  !isMd
                    ? ({ name, percent }) =>
                        `${name.charAt(0).toUpperCase() + name.slice(1)} ${(percent * 100).toFixed(0)}%`
                    : false
                }
                labelLine={!isMd}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
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
                formatter={(value, name) => [`${value} (${((value / total) * 100).toFixed(0)}%)`, name]}
              />
              <Legend
                verticalAlign="bottom"
                height={48}
                content={renderLegend}
                wrapperStyle={{ paddingTop: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Optional summary line */}
        <div className="text-center text-xs text-gray-500 mt-2">
          Total suggestions: {total}
        </div>
      </div>
    </div>
  );
};

export default ApprovalPieChart;