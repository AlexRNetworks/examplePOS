import React, { useState } from 'react';
import mockUsersData from '../data/mockUsers.json'; 

const UserManagement = () => {
    const [users, setUsers] = useState(mockUsersData);
    
    // MOCK DELETE function 
    const deleteUser = (id) => {
        if (window.confirm(`Are you sure you want to fire user ID ${id}? (Simulated Action)`)) {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">User & Role Management</h2>
            
            <button className="bg-blue-600 text-white p-3 rounded-lg mb-6 hover:bg-blue-700 transition-colors shadow-md">
                ➕ Simulate Add New Employee
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
                                <td className={`px-6 py-4 whitespace-nowrap font-semibold ${user.role === 'IT Admin' ? 'text-purple-600' : user.role === 'Server' ? 'text-blue-600' : 'text-gray-800'}`}>{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{user.pin}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit Role</button>
                                    <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900">Terminate (Mock)</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
