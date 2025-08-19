import React from 'react'
import assets, { messagesDummyData } from '../assets/assets'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-sm">
      <div className="flex items-center gap-2 mx-3 mt-3 border-b border-white/20 pb-3">
        <img src={assets.profile_martin} alt="" className="w-7 h-7 rounded-full" />
        <div className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <button onClick={() => setSelectedUser(null)} className="max-md:hidden mx-1 p-1">
          <img src={assets.arrow_icon} alt="" className="w-4 h-4" />
        </button>
        <img src={assets.help_icon} alt="" className="w-4 h-4" />
      </div>

      <div className="flex flex-col h-[calc(100%-120px)] overflow-scroll p-3">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${msg.sender_id === '68f05e4f1ef3dc682d8c' ? '' : 'flex-row-reverse'
              }`}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt=""
                className="max-w-[200px] border border-gray-700 rounded-lg overflow-hidden mb-1"
              />
            )}
            <p
              className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '68f50e4f10f3dc2832ecf9' ? 'rounded-br-none' : 'rounded-bl-none'
                }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>


    </div>
  ) : (
    <div className="h-full flex flex-col items-center justify-center">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer