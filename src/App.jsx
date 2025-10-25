import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// Page Components 
import Dashboard from './pages/Dashboard'; 
import MenuManagement from './pages/MenuManagement';
import UserManagement from './pages/UserManagement';
import SystemSettings from './pages/SystemSettings';
import Inventory from './pages/Inventory'; // <-- NEW IMPORT

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
              <Route path="/inventory" element={<Inventory />} /> {/* <-- NEW ROUTE */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
