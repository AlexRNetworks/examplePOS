import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// Page Components 
import Dashboard from './pages/Dashboard'; 
import MenuManagement from './pages/MenuManagement';
import UserManagement from './pages/UserManagement';
import SystemSettings from './pages/SystemSettings';
import Inventory from './pages/Inventory'; 

// --- GLOBAL MOCK INVENTORY DATA ---
const initialInventory = [
    // Added consumptionRate. Disposable Napkins is 'On Hold' (rate: 0)
    { id: 1, name: '8oz Beef Filet Cuts', currentStock: 12, unit: 'cuts', supplier: 'Premium Meats', consumptionRate: 5 },
    { id: 2, name: 'Espresso Beans (lb)', currentStock: 40, unit: 'lbs', supplier: 'Local Roasters', consumptionRate: 10 },
    { id: 3, name: 'Heirloom Tomatoes', currentStock: 25, unit: 'units', supplier: 'Farm Fresh', consumptionRate: 7 },
    { id: 4, name: 'Disposable Napkins', currentStock: 1500, unit: 'units', supplier: 'Paper Supply Co', consumptionRate: 0 },
];
// ----------------------------------------------------------------

const App = () => {
    // Inventory state is now managed here to be shared with all components
    const [inventory, setInventory] = useState(initialInventory);
    
    // --- STOCK CONSUMPTION LOGIC ---
    const simulateDailyConsumption = () => {
        
        const updatedInventory = inventory.map(item => {
            // Read consumption rate directly from the item, defaulting to 0
            const consumed = item.consumptionRate || 0;
            
            // Calculate new stock, ensuring it doesn't go below zero
            const newStock = Math.max(0, item.currentStock - consumed);
            
            return {
                ...item,
                currentStock: newStock,
            };
        });
        
        setInventory(updatedInventory);
        
        // Return a summary message for the dashboard alert
        return updatedInventory.filter(item => item.currentStock === 0).length;
    };
    // -------------------------------------------------------------


    return (
        <Router>
            <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                        <Routes>
                            {/* Dashboard receives the consumption function */}
                            <Route 
                                path="/" 
                                element={<Dashboard simulateConsumption={simulateDailyConsumption} inventory={inventory} />} 
                            /> 
                            
                            {/* Inventory receives the state and setter function */}
                            <Route 
                                path="/inventory" 
                                element={<Inventory inventory={inventory} setInventory={setInventory} />} 
                            />
                            
                            {/* Other routes remain the same */}
                            <Route path="/menu-management" element={<MenuManagement />} />
                            <Route path="/user-management" element={<UserManagement />} />
                            <Route path="/system-settings" element={<SystemSettings />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;
