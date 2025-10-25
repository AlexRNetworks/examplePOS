import React from 'react';
import { NavLink } from 'react-router-dom';

// Define all navigation items, including the new Inventory page
const navItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Menu Management', path: '/menu-management', icon: '🍽️' },
  { name: 'User Management', path: '/user-management', icon: '👥' },
  { name: 'Inventory/Stock', path: '/inventory', icon: '📦' }, // <-- NEW INVENTORY LINK
  { name: 'System Settings', path: '/system-settings', icon: '⚙️' },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white shadow-xl">
      
      {/* App Branding/Title */}
      <div className="h-20 flex items-center justify-center border-b border-gray-700">
        <h1 className="text-2xl font-extrabold text-indigo-400">POS Admin</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            // Use Tailwind classes for styling based on active state
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 
              ${isActive 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Version Info */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
        <p>POS Admin Trainer v1.0</p>
        <p>IT Simulation Mode Active</p>
      </div>
    </div>
  );
};

export default Sidebar;
