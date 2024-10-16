import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Thư viện điều hướng nếu bạn sử dụng React Router
import Header from '../../components/customer/Header';
import Footer from '../../components/customer/Footer';
import { Input } from '@mui/material';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    birthdate: '01/01/1990',
    address: '123 Đường ABC, Thành phố XYZ'
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className="bg-gray-100  flex flex-col">
      {/* Header */}
      <Header></Header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="flex justify-center items-center" style={{height: 700}}>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <img 
                src="https://via.placeholder.com/150" 
                alt="User avatar" 
                className="w-32 h-32 rounded-full mb-4"
              />
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* User Details */}
            <div className="text-left mb-6">
              <h2 className="text-lg font-semibold mb-2">Thông tin cá nhân</h2>
              {isEditing ? (
                <form className="space-y-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Tên đầy đủ</label>
                    <Input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Ngày sinh</label>
                    <Input
                      type="date"
                      value={user.birthdate}
                      onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Địa chỉ</label>
                    <Input
                      type="text"
                      value={user.address}
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button 
                      type="button" 
                      onClick={handleEditClick}
                      className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit"
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Tên đầy đủ</label>
                    <p className="text-gray-800">{user.name}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Ngày sinh</label>
                    <p className="text-gray-800">{user.birthdate}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Địa chỉ</label>
                    <p className="text-gray-800">{user.address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <div>
              <button 
                onClick={handleEditClick}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 w-full"
              >
                {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa hồ sơ'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}

export default Profile;
