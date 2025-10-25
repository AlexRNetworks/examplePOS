import React, { useState } from 'react';
// Import the static data directly
import mockMenuData from '../data/mockMenu.json'; 

const MenuManagement = () => {
    // Initialize state with the mock data
    const [menuItems, setMenuItems] = useState(mockMenuData);

    // --- MOCK CRUD OPERATIONS ---
    // These functions SIMULATE what the backend would do
    
    // MOCK DELETE function
    const deleteItem = (id) => {
        if (window.confirm(`Are you sure you want to delete item ID ${id}? (Simulated Action)`)) {
            // Filter the array to remove the item (simulates database removal)
            const updatedMenu = menuItems.filter(item => item.id !== id);
            setMenuItems(updatedMenu);
        }
    };
    
    // MOCK ADD function (Simplified for example)
    const addItem = () => {
        const newItem = {
            id: Date.now(), // Use timestamp for a unique ID
            name: "New Mock Item",
            price: 5.00,
            category: "New Category",
            active: true
        };
        // Add the new item to the state array (simulates database insertion)
        setMenuItems([...menuItems, newItem]);
    };
    // ----------------------------
    
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Menu Management (IT View)</h2>
            <button 
                onClick={addItem} 
                className="bg-green-500 text-white p-2 rounded mb-4"
            >
                Simulate Add Item
            </button>
            
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{item.id}</td>
                            <td className="py-2 px-4 border-b">{item.name} ({item.category})</td>
                            <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    onClick={() => deleteItem(item.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete (Mock)
                                </button>
                                {/* Add 'Edit' button placeholder */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MenuManagement;
