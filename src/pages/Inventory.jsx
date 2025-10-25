import React, { useState } from 'react';

// Mock data representing inventory items (raw ingredients/supplies)
const initialInventory = [
    { id: 1, name: '8oz Beef Filet Cuts', currentStock: 12, unit: 'cuts', supplier: 'Premium Meats' },
    { id: 2, name: 'Espresso Beans (lb)', currentStock: 40, unit: 'lbs', supplier: 'Local Roasters' },
    { id: 3, name: 'Heirloom Tomatoes', currentStock: 25, unit: 'units', supplier: 'Farm Fresh' },
    { id: 4, name: 'Disposable Napkins', currentStock: 1500, unit: 'units', supplier: 'Paper Supply Co' },
];

const Inventory = () => {
    const [inventory, setInventory] = useState(initialInventory);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStockItem, setCurrentStockItem] = useState(null);

    // Opens the modal for editing stock
    const openEditModal = (item) => {
        setCurrentStockItem(item);
        setIsModalOpen(true);
    };

    // Handles input change in the modal
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentStockItem(prev => ({
            ...prev,
            [name]: name === 'currentStock' ? parseInt(value) || 0 : value,
        }));
    };

    // Saves the changes (Mock Update)
    const saveChanges = () => {
        if (!currentStockItem) return;

        const updatedInventory = inventory.map(item =>
            item.id === currentStockItem.id ? currentStockItem : item
        );
        
        setInventory(updatedInventory);
        setIsModalOpen(false);
        alert(`SUCCESS: Stock for ${currentStockItem.name} updated to ${currentStockItem.currentStock} ${currentStockItem.unit}.`);
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Inventory & Stock Management</h2>
            <p className="text-gray-600 mb-4">
                View and manually adjust stock levels for raw goods and supplies.
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {inventory.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`font-bold ${item.currentStock < 15 ? 'text-red-600' : 'text-green-600'}`}>
                                        {item.currentStock} {item.unit}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => openEditModal(item)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Adjust Stock
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- EDIT STOCK MODAL COMPONENT --- */}
            {isModalOpen && currentStockItem && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-4 border-b pb-2">
                            Adjust Stock: {currentStockItem.name}
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Stock Input */}
                            <label className="block">
                                <span className="text-gray-700">New Current Stock ({currentStockItem.unit})</span>
                                <input 
                                    type="number" 
                                    name="currentStock" 
                                    value={currentStockItem.currentStock || 0} 
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                    min="0"
                                />
                                <p className="text-sm text-gray-500 mt-1">Simulates receiving a new shipment or performing a stock count.</p>
                            </label>
                            
                            {/* Supplier Read-only */}
                             <label className="block">
                                <span className="text-gray-700">Supplier (Read Only)</span>
                                <input 
                                    type="text" 
                                    value={currentStockItem.supplier || ''} 
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-100"
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
                                Update Stock (Mock)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
