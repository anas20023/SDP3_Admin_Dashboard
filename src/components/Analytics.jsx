import React from 'react'
import { useOutletContext } from 'react-router-dom'

const Analytics = () => {
    const { role } = useOutletContext();
    return (
        <div className="p-6 bg-base-100 flex-1">
            <div className="card bg-base-200 shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Dashboard Overview
                </h2>
                <p>{role.label}</p>
            </div>
        </div>
    )
}

export default Analytics
