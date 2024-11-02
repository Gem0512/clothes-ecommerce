// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
  return (
    <nav className="bg-gray-800 text-white w-64">
      <ul>
        <li>
          <Link to="/dashboard" className="block p-4 hover:bg-gray-700">Dashboard</Link>
        </li>
        <li>
          <Link to="/products" className="block p-4 hover:bg-gray-700">Products</Link>
        </li>
        <li>
          <Link to="/categories" className="block p-4 hover:bg-gray-700">Categories</Link>
        </li>
        <li>
          <Link to="/orders" className="block p-4 hover:bg-gray-700">Orders</Link>
        </li>
        <li>
          <Link to="/users" className="block p-4 hover:bg-gray-700">Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarMenu;
