import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// Page Components — CONFIRM these paths and names match your files exactly
import Dashboard from './pages/Dashboard'; 
import MenuManagement from './pages/MenuManagement';
import UserManagement from './pages/UserManagement';
import SystemSettings from './pages/SystemSettings';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar /> {/* Left Navigation */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header /> {/* Top Bar */}
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} /> 
              <Route path="/menu-management" element={<MenuManagement />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/system-settings" element={<SystemSettings />} />
              {/* Added fallback for Inventory route */}
              <Route path="/inventory" element={<h2 className="text-2xl font-bold p-6">📦 Inventory Management (Coming Soon)</h2>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
