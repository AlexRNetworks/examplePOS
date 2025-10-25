import React, { useState } from 'react';

const SystemSettings = () => {
    // Mock state for system-wide configuration
    const [settings, setSettings] = useState({
        taxRate: 7.5,
        tipPooling: true,
        terminalCount: 4,
        kitchenPrinter: 'KITCHEN_HP_01',
        autoBackup: true
    });
    
    // Handles mock saving of the form data
    const handleSave = () => {
        alert(`SUCCESS: System settings SAVED (Mock Action):\nTax: ${settings.taxRate}%\nTerminals: ${settings.terminalCount}`);
    };

    // Handles mock clearing of the cache (A common IT task)
    const handleClearCache = () => {
        if (window.confirm("Are you sure you want to clear the local POS cache on all terminals? This requires terminals to restart.")) {
            alert("ACTION: Local POS cache cleared on all devices. Terminals will experience a brief reboot. (Mock Action)");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">System Configuration & Settings</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl">
                
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">Financial Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-gray-700">Sales Tax Rate (%)</span>
                        <input 
                            type="number" 
                            name="taxRate" 
                            value={settings.taxRate} 
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" 
                            step="0.1" 
                        />
                    </label>

                    <label className="block flex items-center space-x-3 mt-6">
                        <input 
                            type="checkbox" 
                            name="tipPooling" 
                            checked={settings.tipPooling} 
                            onChange={handleChange}
                            className="rounded text-blue-600" 
                        />
                        <span className="text-gray-700">Enable Automatic Tip Pooling</span>
                    </label>
                </div>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 border-b pb-2">Hardware & Maintenance</h3>
                 <div className="grid grid-cols-2 gap-4">
                     <label className="block">
                        <span className="text-gray-700">Active POS Terminals</span>
                        <input 
                            type="number" 
                            name="terminalCount" 
                            value={settings.terminalCount} 
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Kitchen Printer ID</span>
                        <input 
                            type="text" 
                            name="kitchenPrinter" 
                            value={settings.kitchenPrinter} 
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        />
                    </label>
                     <label className="block flex items-center space-x-3">
                        <input 
                            type="checkbox" 
                            name="autoBackup" 
                            checked={settings.autoBackup} 
                            onChange={handleChange}
                            className="rounded text-blue-600" 
                        />
                        <span className="text-gray-700">Enable Daily Cloud Backup</span>
                    </label>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-2 text-red-700">System Utilities</h4>
                    <button 
                        onClick={handleClearCache}
                        className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors shadow-lg"
                    >
                        🚨 Clear Local POS Cache (Troubleshooting)
                    </button>
                </div>

                <button 
                    onClick={handleSave}
                    className="mt-6 bg-indigo-600 text-white p-3 rounded-md w-full hover:bg-indigo-700 transition-colors shadow-lg"
                >
                    Apply and Save Settings (Mock)
                </button>
            </div>
        </div>
    );
};

export default SystemSettings;
