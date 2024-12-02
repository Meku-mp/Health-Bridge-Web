// import React from 'react';

export default function ChatList () {
  const chats = [
    { id: 1, name: "Waldemar Mannering", message: "Refer friends. Get rewards.", time: "1 Minute" },
    { id: 2, name: "Felecia Rower", message: "I will purchase it for sure. 👍", time: "8 Minutes" },
    { id: 3, name: "Calvin Moore", message: "If it takes long you can mail...", time: "1 Day" },
  ];

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="font-bold text-lg mb-4">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="p-3 mb-2 bg-white rounded shadow hover:bg-gray-200 cursor-pointer"
          >
            <p className="font-semibold">{chat.name}</p>
            <p className="text-sm text-gray-600 truncate">{chat.message}</p>
            <p className="text-xs text-gray-400">{chat.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

