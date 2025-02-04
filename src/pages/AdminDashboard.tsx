import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, LogOut, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  // Get data from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const loginActivity = JSON.parse(localStorage.getItem('loginActivity') || '[]');
  const quoteRequests = JSON.parse(localStorage.getItem('quoteRequests') || '[]');

  const renderUsers = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Registered Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(user.id).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLoginActivity = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Login Activity</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loginActivity.map((activity: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{activity.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(activity.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    activity.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {activity.success ? 'Success' : 'Failed'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderQuoteRequests = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Quote Requests</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quoteRequests.map((quote: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(quote.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.material}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.materialType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.color}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">${quote.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.fileName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black min-h-screen p-6">
          <h2 className="text-white text-xl font-bold mb-8">Admin Dashboard</h2>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'users' ? 'bg-white text-black' : 'text-white hover:bg-gray-800'
              }`}
            >
              <Users size={20} />
              <span>Users</span>
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'activity' ? 'bg-white text-black' : 'text-white hover:bg-gray-800'
              }`}
            >
              <Activity size={20} />
              <span>Login Activity</span>
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'quotes' ? 'bg-white text-black' : 'text-white hover:bg-gray-800'
              }`}
            >
              <ShoppingBag size={20} />
              <span>Quote Requests</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'activity' && renderLoginActivity()}
            {activeTab === 'quotes' && renderQuoteRequests()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;