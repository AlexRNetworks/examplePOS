import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Menu Management', path: '/menu-management', icon: '🍽️' },
  { name: 'User Management', path: '/user-management', icon: '👥' },
  { name: 'System Settings', path: '/system-settings', icon: '⚙️' },
  { name: 'Inventory/Stock', path: '/inventory', icon: '📦' },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold mb-6 text-yellow-400">POS Admin Trainer</div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            // Highlight the link if the current path matches
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 
              ${location.pathname === item.path 
                ? 'bg-gray-700 font-semibold' 
                : 'hover:bg-gray-700'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700 text-sm text-gray-400">
        Version: 1.0 (Mock)
      </div>
    </div>
  );
};

export default Sidebar;
