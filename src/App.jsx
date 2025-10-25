import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// Page Components
import MenuManagement from './pages/MenuManagement';
import UserManagement from './pages/UserManagement';
import SystemSettings from './pages/SystemSettings';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar /> {/* Navigation links on the left */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header /> {/* Top bar for quick actions/user info */}
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            <Routes>
              {/* IT Admin Dashboard Landing Page */}
              <Route path="/" element={<Dashboard />} /> 
              
              {/* Core Administration Pages */}
              <Route path="/menu-management" element={<MenuManagement />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/system-settings" element={<SystemSettings />} />
              
              {/* Future routes: Inventory, Sales Reports, etc. */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
