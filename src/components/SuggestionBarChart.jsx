import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SuggestionBarChart = ({ data }) => {
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

    const chartData = Object.values(aggregated);

    return (
        <>
            <p className="font-semibold text-slate-800 text-center py-2">
                Top Suggestion Uploading Users
            </p>
            <BarChart
                width={750}
                height={250}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="uploaded_by" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="uploads" fill="#8884d8" name="Uploads" />
                <Bar yAxisId="right" dataKey="totalStars" fill="#82ca9d" name="Total Stars" />
            </BarChart>
        </>
    );
};

export default SuggestionBarChart;