import React, { useState } from 'react';
import mockMenuData from '../data/mockMenu.json'; 

const MenuManagement = () => {
    // Initialize state with the mock data to enable mock CRUD operations
    const [menuItems, setMenuItems] = useState(mockMenuData);

    // MOCK DELETE function (Simulates database removal)
    const deleteItem = (id) => {
        if (window.confirm(`Are you sure you want to delete item ID ${id}? (Simulated Action)`)) {
            const updatedMenu = menuItems.filter(item => item.id !== id);
            setMenuItems(updatedMenu);
        }
    };
    
    // MOCK ADD function (Simulates database insertion)
    const addItem = () => {
        const newItem = {
            id: Date.now(), // Unique ID
            name: "New Promo Item",
            price: 5.99,
            category: "Seasonal",
            active: true
        };
        setMenuItems([...menuItems, newItem]);
    };
    
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Menu Item Management</h2>
            
            <button 
                onClick={addItem} 
                className="bg-green-600 text-white p-3 rounded-lg mb-6 hover:bg-green-700 transition-colors shadow-md"
            >
                ➕ Simulate Add New Item
            </button>
            
            <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {menuItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">${item.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {item.active ? 'Active' : 'Disabled'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:text-red-900">Delete (Mock)</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuManagement;
