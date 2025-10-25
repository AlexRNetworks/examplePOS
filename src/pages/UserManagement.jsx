import React, { useState } from 'react';
import mockUsersData from '../data/mockUsers.json'; 

const UserManagement = () => {
    const [users, setUsers] = useState(mockUsersData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // User currently being edited

    // Opens the modal and loads the user data
    const openEditModal = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    // Handles form input changes within the modal
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Saves the changes (Mock Update/Add Logic)
    const saveChanges = () => {
        if (!currentUser) return;
        
        let updatedUsers;

        // Check if the user ID is negative (Our sign for a NEW user)
        if (currentUser.id < 0) {
            // New User Logic (ADD)
            const permanentId = Math.floor(Math.random() * 1000) + 500; 
            const newUser = { ...currentUser, id: permanentId };
            updatedUsers = [newUser, ...users]; // Add to the top
            alert(`SUCCESS: NEW User ${newUser.name} added with ID ${permanentId}.`);
        } else {
            // Existing User Logic (UPDATE)
            updatedUsers = users.map(user =>
                user.id === currentUser.id ? currentUser : user
            );
            alert(`SUCCESS: User ${currentUser.name}'s details (Role: ${currentUser.role}) have been updated.`);
        }
        
        setUsers(updatedUsers);
        setIsModalOpen(false);
    };
    
    // MOCK DELETE function (Simulates database removal)
    const deleteUser = (id) => {
        if (window.confirm(`Are you sure you want to fire user ID ${id}? (Simulated Action)`)) {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
            alert(`ACTION: User ID ${id} removed from system.`);
        }
    };
    
    // MOCK ADD function
    const addUser = () => {
        const newUser = {
            id: Date.now() * -1, // Negative ID marks it as NEW
            name: "New Employee",
            role: "Server",
            pin: "0000",
            email: "new@restaurant.com"
        };
        openEditModal(newUser);
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">User & Role Management</h2>
            
            <button 
                onClick={addUser}
                className="bg-green-600 text-white p-3 rounded-lg mb-6 hover:bg-green-700 transition-colors shadow-md"
            >
                ➕ Add New Employee
            </button>

            <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PIN</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                <td className={`px-6 py-4 whitespace-nowrap font-semibold ${user.role === 'IT Admin' ? 'text-purple-600' : user.role === 'Manager' ? 'text-blue-600' : 'text-gray-800'}`}>{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">****</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => openEditModal(user)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit Details
                                    </button>
                                    <button 
                                        onClick={() => deleteUser(user.id)} 
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Terminate (Mock)
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* --- EDIT USER MODAL COMPONENT --- */}
            {isModalOpen && currentUser && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-4 border-b pb-2">
                            {currentUser.id < 0 ? 'Add New Employee' : `Edit User: ${currentUser.name}`}
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Name Input */}
                            <label className="block">
                                <span className="text-gray-700">Employee Name</span>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={currentUser.name || ''} 
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                            </label>

                            {/* Role Dropdown */}
                            <label className="block">
                                <span className="text-gray-700">Role/Access Level</span>
                                <select 
                                    name="role" 
                                    value={currentUser.role || 'Server'} 
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                >
                                    <option>IT Admin</option>
                                    <option>Manager</option>
                                    <option>Server</option>
                                    <option>Cook/BOH</option>
                                </select>
                            </label>

                            {/* PIN Reset Input */}
                             <label className="block">
                                <span className="text-gray-700">POS PIN (Simulated Reset)</span>
                                <input 
                                    type="password" 
                                    name="pin" 
                                    value={currentUser.pin || ''} 
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                    maxLength="4"
                                />
                                <p className="text-xs text-red-500 mt-1">Changing this simulates a PIN reset. New PIN: {currentUser.pin}</p>
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
                                {currentUser.id < 0 ? 'Create New Employee (Mock)' : 'Save Changes (Mock)'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
