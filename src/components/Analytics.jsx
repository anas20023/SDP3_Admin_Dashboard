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
        <div className="p-2 sm:p-4 grid grid-cols-1 lg:grid-cols-5 bg-base-200 gap-2 sm:gap-4 lg:gap-6">
            <div className="min-w-0 lg:col-span-5 bg-white p-2 sm:p-4 rounded-lg shadow-sm w-full">
                {data.userAnalytics && <UsersLast30Day data={data.userAnalytics} />}
            </div>
            <div className="min-w-0 lg:col-span-3 bg-white p-2 sm:p-4 rounded-lg shadow-sm w-full">
                {data.starAnalysis && <SuggestionBarChart data={data.starAnalysis} />}
            </div>
            <div className="min-w-0 lg:col-span-2 bg-white p-2 sm:p-4 rounded-lg shadow-sm w-full">
                {data.suggestionAnalysis && <ApprovalPieChart data={data.suggestionAnalysis} />}
            </div>
        </div>
    );
};

export default Analytics;