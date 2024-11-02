import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/outline';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-200 text-gray-800 h-full flex flex-col">
      <div className="flex items-center justify-center h-16 bg-gray-300">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="px-2 py-4 flex-1">
        <Link
          to="/dashboard"
          className="flex items-center block px-4 py-2 mt-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 no-underline"
        >
          <CubeIcon className="w-5 h-5 mr-2" /> {/* Icon sản phẩm */}
          Dashboard
        </Link>
        <Link
          to="/products"
          className="flex items-center block px-4 py-2 mt-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 no-underline"
        >
          <CubeIcon className="w-5 h-5 mr-2" /> {/* Icon sản phẩm */}
          Quản lý sản phẩm
        </Link>
        <Link
          to="/categories"
          className="flex items-center block px-4 py-2 mt-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 no-underline"
        >
          <HomeIcon className="w-5 h-5 mr-2" /> {/* Icon danh mục */}
          Quản lý danh mục
        </Link>
        <Link
          to="/orders"
          className="flex items-center block px-4 py-2 mt-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 no-underline"
        >
          <ShoppingCartIcon className="w-5 h-5 mr-2" /> {/* Icon đơn hàng */}
          Quản lý đơn hàng
        </Link>
        <Link
          to="/users"
          className="flex items-center block px-4 py-2 mt-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 no-underline"
        >
          <UserIcon className="w-5 h-5 mr-2" /> {/* Icon người dùng */}
          Quản lý tài khoản người dùng
        </Link>
      </nav>
    </div>
  );
}
