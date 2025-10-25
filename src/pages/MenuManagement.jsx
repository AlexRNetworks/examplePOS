import React, { useState } from 'react';
import mockMenuData from '../data/mockMenu.json'; 

const MenuManagement = () => {
    // Initial state setup
    const [menuItems, setMenuItems] = useState(mockMenuData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null); 
    const [filterCategory, setFilterCategory] = useState('All');

    // MOCK STOCK STATE: Used to simulate inventory levels
    const [mockStock, setMockStock] = useState({
        'lettuce, tomato, cucumber': 50,
        '8oz_beef_filet, butter': 12, // Low stock example
        'espresso_beans': 100,
        'NEW_ITEM_INVENTORY_ID': 50,
    });

    // Helper function to get stock level
    const getStockLevel = (link) => {
        return mockStock[link] !== undefined ? mockStock[link] : 0;
    };

    // --- MOCK CRUD OPERATIONS ---

    // Opens the modal and loads the item data
    const openEditModal = (item) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    // Handles form input changes within the modal
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentItem(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'price' ? parseFloat(value) : value),
        }));
    };

    // Saves the changes (Mock Update/Add Logic)
    const saveChanges = () => {
        if (!currentItem) return;

        let updatedMenu;
        
        // Check if the item ID is negative (Our sign for a NEW item)
        if (currentItem.id < 0) {
            // New Item Logic (ADD)
            const permanentId = Math.floor(Math.random() * 1000) + 500; 
            const newItem = { ...currentItem, id: permanentId };
            updatedMenu = [newItem, ...menuItems]; // Add to the top of the list
            alert(`SUCCESS: NEW Item ${newItem.name} added with ID ${permanentId}.`);

            // MOCK: Initialize stock for the new item if inventory_link is provided
            if (newItem.inventory_link) {
                setMockStock(prev => ({ ...prev, [newItem.inventory_link]: 50 }));
            }

        } else {
            // Existing Item Logic (UPDATE)
            updatedMenu = menuItems.map(item =>
                item.id === currentItem.id ? currentItem : item
            );
            alert(`SUCCESS: Item ${currentItem.name} updated.`);
        }
        
        setMenuItems(updatedMenu);
        setIsModalOpen(false);
    };

    // MOCK DELETE function 
    const deleteItem = (id) => {
        if (window.confirm(`Are you sure you want to permanently disable item ID ${id}? (Simulated Action)`)) {
            const updatedMenu = menuItems.filter(item => item.id !== id);
            setMenuItems(updatedMenu);
        }
    };
    
    // MOCK ADD function
    const addItem = () => {
        const newItem = {
            id: Date.now() * -1, // Negative ID marks it as NEW
            name: "New Custom Item",
            price: 1.00,
            category: "New Category",
            active: true,
            inventory_link: 'NEW_ITEM_INVENTORY_ID'
        };
        openEditModal(newItem); 
    };

    // Filter Logic
    const filteredItems = menuItems.filter(item => 
        filterCategory === 'All' || item.category === filterCategory
    );
    
    // Get unique categories for the filter dropdown
    const categories = ['All', ...new Set(mockMenuData.map(item => item.category))];

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Menu Item Management</h2>
            
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={addItem} 
                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                    ➕ Add New Menu Item
                </button>
                
                {/* Category Filter */}
                <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg shadow-sm"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat} ({menuItems.filter(item => cat === 'All' || item.category === cat).length})</option>
                    ))}
                </select>
            </div>
            
            {/* Menu Item Table */}
            <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{item.id > 0 ? item.id : 'NEW'}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {item.name} 
                                    <div className="text-xs text-gray-500">{item.category}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">${item.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {item.active ? 'Active' : 'Disabled'}
                                    </span>
                                </td>
                                {/* Stock Column */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`font-semibold ${getStockLevel(item.inventory_link) < 15 ? 'text-red-600' : 'text-green-600'}`}>
                                        {getStockLevel(item.inventory_link)} units
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => openEditModal(item)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit Details
                                    </button>
                                    <button 
                                        onClick={() => deleteItem(item.id)} 
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete (Mock)
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* --- EDIT MODAL COMPONENT --- */}
            {isModalOpen && currentItem && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-4 border-b pb-2">
                            {currentItem.id < 0 ? 'Add New Item' : `Edit Item: ${currentItem.name}`}
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Name Input */}
                            <label className="block">
                                <span className="text-gray-700">Item Name</span>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={currentItem.name || ''} 
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                            </label>

                            {/* Price Input */}
                            <label className="block">
                                <span className="text-gray-700">Price ($)</span>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={currentItem.price || 0} 
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                    step="0.01"
                                />
                            </label>

                            {/* Category Input */}
                             <label className="block">
                                <span className="text-gray-700">Category</span>
                                <input 
                                    type="text" 
                                    name="category" 
                                    value={currentItem.category || ''} 
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                            </label>
                            
                            {/* Active Checkbox */}
                            <label className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    name="active" 
                                    checked={currentItem.active || false} 
                                    onChange={handleFormChange}
                                    className="rounded text-green-600" 
                                />
                                <span className="text-gray-700 font-medium">Item Active on POS</span>
                            </label>
                            
                            {/* Inventory Link Field */}
                            <label className="block">
                                <span className="text-gray-700">Inventory Link ID</span>
                                <input 
                                    type="text" 
                                    name="inventory_link" 
                                    value={currentItem.inventory_link || ''} 
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50"
                                    placeholder="e.g., steak_8oz_cut"
                                />
                            </label>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveChanges}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                {currentItem.id < 0 ? 'Create New Item (Mock)' : 'Save Changes (Mock)'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuManagement;
