"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' } | null>(null);
  // Fetch users from the API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
   
    try {
      const response = await axios.get<{ users: User[] }>('/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin-token')}`
        }
      });
      if (response.status === 401) {
        
        redirect('/admin/login');

      }
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      redirect('/login');
    }
  };

  // Handle form submission to update a user
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const response = await axios.post<{ message: string; user: User }>(
        '/api/users',
        selectedUser
      );
      alert(response.data.message);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  // Handle sorting
  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle searching
  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    // Handle null/undefined values
    if (!aValue && !bValue) return 0;
    if (!aValue) return 1;
    if (!bValue) return -1;
    
    // Safe comparison with type check
    return sortConfig.direction === 'ascending'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-300"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700">
              <thead>
                <tr>
                  <th
                    className="py-3 px-4 border border-gray-700 cursor-pointer"
                    onClick={() => requestSort('userName')}
                  >
                    Username {sortConfig?.key === 'userName' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th
                    className="py-3 px-4 border border-gray-700 cursor-pointer"
                    onClick={() => requestSort('Name')}
                  >
                    Name {sortConfig?.key === 'Name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th
                    className="py-3 px-4 border border-gray-700 cursor-pointer"
                    onClick={() => requestSort('email')}
                  >
                    Email {sortConfig?.key === 'email' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th className="py-3 px-4 border border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-gray-700">
                    <td className="py-2 px-4 border border-gray-700">{user.userName}</td>
                    <td className="py-2 px-4 border border-gray-700">{user.Name}</td>
                    <td className="py-2 px-4 border border-gray-700">{user.email}</td>
                    <td className="py-2 px-4 border border-gray-700">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit User Form */}
        <div>
          {selectedUser && (
            <form onSubmit={handleUpdateUser} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={selectedUser.userName}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, userName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={selectedUser.Name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, Name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={selectedUser.Bio || ''}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, Bio: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update User
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}