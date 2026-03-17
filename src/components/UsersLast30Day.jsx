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
    return (
        <>
            <p className='font-semibold text-slate-800 text-center py-2'>User registrations in Last 30 Days</p>
            <div >
                <ResponsiveContainer width="100%" height="200" minWidth={400}>
                    <AreaChart
                        title='Users in Last 30 Days'
                        data={data}
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
        </>
    )
}

export default UsersLast30Day
