import axios from 'axios';
import { useEffect, useState } from 'react';
import UsersLast30Day from './UsersLast30Day';
import ApprovalPieChart from './ApprovalPieChart';
import SuggestionBarChart from './SuggestionBarChart';
const Analytics = () => {
    const [data, setData] = useState({
        userAnalytics: [],
        suggestionAnalysis: [],
        starAnalysis: []
    });
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
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 bg-base-200 gap-2">
            <div className="md:col-span-5 bg-white px-1 py-4 rounded">
                {data.userAnalytics && <UsersLast30Day data={data.userAnalytics} />}
            </div>
            <div className="md:col-span-3 bg-white px-1 py-4 rounded">
                {data.starAnalysis && <SuggestionBarChart data={data.starAnalysis} />}
            </div>
            <div className="md:col-span-2 bg-white px-1 py-4 rounded">
                {data.suggestionAnalysis && <ApprovalPieChart data={data.suggestionAnalysis} />}
            </div>
        </div>
    );
};

export default Analytics;