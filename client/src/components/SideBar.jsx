import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const SideBar = () => {

  const navigate = useNavigate()

  const { logout, onlineUsers } = useContext(AuthContext);

  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);

  const [input, setInput] = useState(false);

  useEffect(() => {
    getUsers();
  }, [onlineUsers])

  const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().
    includes(input.toLowerCase())) : users;

  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
      <div className='pb-5 '>
        <div className='flex justify-between items-center'>
          <img src={assets.logo} alt="logo" className='w-32' />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="Menu" className='h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-3 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm hover:text-white'>Edit Profile</p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={() => logout()} className='cursor-pointer text-sm hover:text-white'>Logout</p>
            </div>
          </div>
        </div>

        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      <div className="flex flex-col">
        {filteredUsers.map((user, index) => (
          <div key={index} className={`relative flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-[#282142]/30 ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
            }`} onClick={() => setSelectedUser(user)}>
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col flex-1">
              <p className="text-sm font-medium">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-gray-400 text-xs">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <div className="text-xs h-5 w-5 flex justify-center items-center rounded-full bg-blue-500 text-white font-medium">
                {unseenMessages[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );

}

export default SideBar