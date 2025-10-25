import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">System Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* System Status Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <p className="text-sm text-gray-500">System Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">145 Days</p>
                    <span className="text-green-600 font-semibold">Status: Operational</span>
                </div>
                
                {/* Pending Tasks Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-500">Pending IT Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">3 Items</p>
                    <ul className="text-sm list-disc pl-5 mt-2 text-gray-700">
                        <li>Update Tax Rate (2/1)</li>
                        <li>Sync Seasonal Menu</li>
                    </ul>
                </div>

                 {/* Errors Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
                    <p className="text-sm text-gray-500">Critical Errors (24h)</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <span className="text-green-600 font-semibold">No Recent Failures</span>
                </div>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Recent System Logs (Mock)</h3>
                <p className="text-gray-600 text-sm font-mono">
                    [10:01 AM] User 'Jane Smith' modified 'Filet Mignon' price.<br/>
                    [09:55 AM] Server 'Terminal 3' reconnected successfully.<br/>
                    [03:15 AM] Daily Backup process completed.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
