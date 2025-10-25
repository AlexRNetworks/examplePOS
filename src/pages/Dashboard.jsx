import React from 'react';

// Dashboard now accepts the consumption function and inventory data as props
const Dashboard = ({ simulateConsumption, inventory }) => {

    const handleSimulateDay = () => {
        if (window.confirm("Are you sure you want to simulate a full business day? This will reduce inventory levels based on standard usage.")) {
            const outOfStockCount = simulateConsumption();
            
            let message = "SUCCESS: Business day simulated. Inventory levels have been adjusted.";
            if (outOfStockCount > 0) {
                message += `\n⚠️ WARNING: ${outOfStockCount} item(s) are now out of stock! Check the Inventory panel.`;
            }
            alert(message);
        }
    };

    // Calculate quick stats for the dashboard cards
    const totalItems = inventory.length;
    const lowStockCount = inventory.filter(item => item.currentStock < 15).length;
    const criticalStockCount = inventory.filter(item => item.currentStock === 0).length;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Administrative Dashboard</h2>

            {/* Simulated Action Panel */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-t-4 border-indigo-500">
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Simulator Controls</h3>
                <p className="text-gray-600 mb-4">
                    As an admin, simulate daily operations to test the system's reaction to inventory usage.
                </p>
                <button
                    onClick={handleSimulateDay}
                    className="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors shadow-lg font-bold"
                >
                    🗓️ Simulate One Business Day (Consume Stock)
                </button>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                
                {/* Inventory Status Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-500">Total Inventory Items</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{totalItems}</p>
                    <div className="flex items-center text-sm mt-2">
                        <span className="text-yellow-600 font-semibold mr-2">⚠️</span>
                        <span>{lowStockCount} items at low stock</span>
                    </div>
                </div>

                {/* Critical Stock Card */}
                <div className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${criticalStockCount > 0 ? 'border-red-500' : 'border-green-500'}`}>
                    <p className="text-sm text-gray-500">Critical Stock / Outages</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{criticalStockCount}</p>
                    <div className="flex items-center text-sm mt-2">
                         <span className={`${criticalStockCount > 0 ? 'text-red-600' : 'text-green-600'} font-semibold mr-2`}>
                            {criticalStockCount > 0 ? '🚨' : '✅'}
                        </span>
                        <span>{criticalStockCount === 0 ? 'No Critical Issues' : 'Action Required'}</span>
                    </div>
                </div>

                {/* Placeholder Card 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500">POS Terminals Active</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">4 / 4</p>
                    <div className="flex items-center text-sm mt-2">
                        <span className="text-blue-600 font-semibold mr-2">🔗</span>
                        <span>Last check: Live</span>
                    </div>
                </div>

                {/* Placeholder Card 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <p className="text-sm text-gray-500">System Uptime</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">99.98%</p>
                    <div className="flex items-center text-sm mt-2">
                        <span className="text-green-600 font-semibold mr-2">🟢</span>
                        <span>Cloud Database Sync: OK</span>
                    </div>
                </div>
            </div>

            {/* Activity Log (Simplified/Static) */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Recent Admin Activity Log</h3>
                <ul className="space-y-2 text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded">
                    <li className="text-gray-500">[02:10 AM] System: Successful deployment of config update.</li>
                    <li>[02:05 AM] User Management: Alex Johnson's PIN was reset.</li>
                    <li>[01:55 AM] Menu Management: New Item "Promo Drink" added.</li>
                    <li className="text-red-600">[01:00 AM] System Alert: POS Terminal #3 experienced a brief network failure.</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
