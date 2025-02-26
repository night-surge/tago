"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@/types/user';
import { redirect, useRouter } from 'next/navigation';

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' } | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'edit'>('list');
  const router = useRouter();
  
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
      // Return to list view on mobile after successful update
      setMobileView('list');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear admin token
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    // Redirect to login page
    router.push('/admin/login');
  };

  // Handle edit user selection
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    // Switch to edit view on mobile
    setMobileView('edit');
  };

  // Handle back to list on mobile
  const handleBackToList = () => {
    setMobileView('list');
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
    <div className="min-h-screen bg-black text-gray-300 p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Mobile navigation between views */}
      {selectedUser && (
        <div className="flex justify-between items-center mb-4 md:hidden">
          <button
            onClick={handleBackToList}
            className={`px-4 py-2 rounded transition-colors ${mobileView === 'list' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            User List
          </button>
          <button
            onClick={() => setMobileView('edit')}
            className={`px-4 py-2 rounded transition-colors ${mobileView === 'edit' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            Edit User
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* User List - Hide on mobile when editing */}
        <div className={`${mobileView === 'edit' ? 'hidden md:block' : ''}`}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Users</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-300"
            />
          </div>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="min-w-full bg-gray-800 border border-gray-700 text-sm sm:text-base">
              <thead>
                <tr>
                  <th
                    className="py-2 px-2 sm:py-3 sm:px-4 border border-gray-700 cursor-pointer"
                    onClick={() => requestSort('userName')}
                  >
                    Username {sortConfig?.key === 'userName' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th
                    className="py-2 px-2 sm:py-3 sm:px-4 border border-gray-700 cursor-pointer hidden sm:table-cell"
                    onClick={() => requestSort('Name')}
                  >
                    Name {sortConfig?.key === 'Name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th
                    className="py-2 px-2 sm:py-3 sm:px-4 border border-gray-700 cursor-pointer"
                    onClick={() => requestSort('email')}
                  >
                    Email {sortConfig?.key === 'email' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 border border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-gray-700">
                    <td className="py-2 px-2 sm:py-2 sm:px-4 border border-gray-700">{user.userName}</td>
                    <td className="py-2 px-2 sm:py-2 sm:px-4 border border-gray-700 hidden sm:table-cell">{user.Name}</td>
                    <td className="py-2 px-2 sm:py-2 sm:px-4 border border-gray-700 truncate max-w-[120px] sm:max-w-none">{user.email}</td>
                    <td className="py-2 px-2 sm:py-2 sm:px-4 border border-gray-700">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded hover:bg-blue-700 text-sm sm:text-base"
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

        {/* Edit User Form - Hide on mobile when viewing list */}
        <div className={`${mobileView === 'list' ? 'hidden md:block' : ''}`}>
          {selectedUser && (
            <form onSubmit={handleUpdateUser} className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Edit User</h2>
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium mb-1 sm:mb-2">Username</label>
                <input
                  type="text"
                  value={selectedUser.userName}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, userName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium mb-1 sm:mb-2">Name</label>
                <input
                  type="text"
                  value={selectedUser.Name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, Name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium mb-1 sm:mb-2">Bio</label>
                <textarea
                  value={selectedUser.Bio || ''}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, Bio: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 md:hidden"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}